<template>
  <div>
    <a-row>
      <a-col :span="5">
        <div class="list">
          <div class="list-header">
            <a-input
              class="search-input"
              placeholder="search keywords（coming soon）"
            ></a-input>
            <div class="create">
              <a-button icon="plus" type="link" @click="openCreateApiDialog"
                >create new</a-button
              >
            </div>
          </div>
          <div class="list-content">
            <div
              v-for="item in apiList"
              :key="item.doc._id"
              class="list-wrapper"
            >
              <div
                @click="setCurrentApi(item)"
                :class="[
                  'list-item',
                  { active: item.doc._id === currentApi._id }
                ]"
              >
                <span>[{{ item.doc.method }}]&nbsp;</span>
                <span>{{ item.doc.api }}</span>
              </div>
              <div class="option">
                <a-button
                  @click="openEditApiDialog(item)"
                  size="small"
                  icon="edit"
                ></a-button
                >&nbsp;
                <a-button
                  type="danger"
                  size="small"
                  icon="delete"
                  @click="deleteApi(item)"
                ></a-button>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="19">
        <div class="cover-container">
          <div class="cover" v-if="!isSetCurrentApi"></div>
          <editor
            ref="editor"
            class="editor"
            @change="editorChange"
            :language="editorLanguage"
          />
        </div>
      </a-col>
    </a-row>
    <normal-api-dialog ref="api-dialog" @success="onCreateSuccess" />
  </div>
</template>
<script>
import Editor from "@/components/Editor.vue";
import NormalApiDialog from "@/components/NormalApiDialog.vue";

export default {
  name: "NormalAPI",
  components: { NormalApiDialog, Editor },
  data() {
    return {
      editor: null,
      editorValue: "",
      editorLanguage: "json",
      apiList: [],
      currentApi: {}
    };
  },
  computed: {
    isSetCurrentApi() {
      return Object.keys(this.currentApi).length > 0;
    },
  },
  created() {
    this.requestNormalApiList();
  },
  methods: {
    requestNormalApiList() {
      return this.$http.post("get-normal-api-list").then(res => {
        this.apiList = res.data.data.rows;
      });
    },

    setCurrentApi(item) {
      if (this.currentApi._id === item.doc._id) return;
      this.currentApi = item.doc;
      this.$refs.editor.setValue(this.currentApi.content);
    },

    editorChange(content) {
      if (Object.keys(this.currentApi).length > 0) {
        this.currentApi.content = content;
        this.$io.emit("setValue", {
          id: this.currentApi._id,
          api: this.currentApi.api,
          content
        });
      }
    },

    openEditApiDialog(item) {
      this.$refs["api-dialog"].type = "edit";
      this.$refs["api-dialog"].visible = true;
      this.$refs["api-dialog"].formData = item.doc;
    },

    openCreateApiDialog() {
      this.$refs["api-dialog"].type = "create";
      this.$refs["api-dialog"].visible = true;
    },

    async onCreateSuccess(value) {
      try {
        await this.requestNormalApiList();
        this.apiList.forEach(item => {
          if (item.doc.api === value.api) {
            this.currentApi = item.doc;
            this.$refs.editor.setValue(this.currentApi.content);
          }
        });
      } catch (e) {
        throw e;
      }
    },

    deleteApi(item) {
      this.$http.post("delete-normal-api", item.doc).then(() => {
        this.$message.success("DONE");
        if (item.doc._id === this.currentApi._id) {
          this.currentApi = {};
          this.$refs.editor.setValue("");
        }
        this.requestNormalApiList();
      });
    }
  }
};
</script>
<style scoped lang="less">
.editor {
  height: calc(100vh - 46px);
}
.create {
  text-align: center;
}
.search-input {
  border-radius: 0;
  border-color: #e8e8e8;
}
.cover-container {
  position: relative;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,.3);
    z-index: 999;
    cursor: not-allowed;
  }
}
.list {
  .list-content {
    height: calc(100vh - 110px);
    overflow: auto;
    border: 1px solid #e8e8e8;
    border-top: 0 none;
    .list-wrapper {
      position: relative;
      .option {
        position: absolute;
        top: 3px;
        right: 3px;
        display: none;
      }
      &:hover {
        .list-item {
          background: #1890ff;
          color: white;
        }
        .option {
          display: block;
        }
      }
    }
    .list-item {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;
    }
    // .list-item:hover {
    //   background: #1890ff;
    //   color: white;
    // }
    .list-item:last-child {
      border-bottom: 0 none;
    }
    .list-item.active {
      background: #1890ff;
      color: white;
    }
  }
}
</style>
