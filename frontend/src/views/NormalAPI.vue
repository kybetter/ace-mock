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
              <a-button icon="plus" type="link" @click="openCreateApiDialog">create new</a-button>
            </div>
          </div>
          <div class="list-content">
            <div v-for="item in apiList" :key="item.id" class="list-wrapper">
              <div
                @click="setCurrentApi(item)"
                :class="['list-item', { active: item.id === currentApi.id }]"
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
                <a-button type="danger" size="small" icon="delete"></a-button>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="19">
        <editor
          class="editor"
          @change="editorChange"
          v-model="editorValue"
          :language="editorLanguage"
        />
      </a-col>
    </a-row>
    <edit-dialog ref="edit-api" />
    <create-normal-dialog ref="create-dialog" @success="onCreateSuccess" />
  </div>
</template>
<script>
import EditDialog from "./EditDialog.vue";
import Editor from "@/components/Editor.vue";
import CreateNormalDialog from "@/components/CreateNormalDialog.vue";

export default {
  name: "NormalAPI",
  components: { EditDialog, CreateNormalDialog, Editor },
  data() {
    return {
      editor: null,
      editorValue: "",
      editorLanguage: "json",
      apiList: [],
      currentApi: {},
    };
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
      if (this.currentApi.id === item.id) return;
      this.currentApi = item;
    },

    editorChange(content) {
      if (Object.keys(this.currentApi).length > 0) {
        console.log(content);
        this.$io.emit("setValue", {
          id: this.currentApi.id,
          api: this.currentApi.api,
          content
        });
      }
    },

    openEditApiDialog(item) {
      item.type = "NormalAPI";
      this.$refs["edit-api"].formData = item;
      this.$refs["edit-api"].visible = true;
    },

    openCreateApiDialog() {
      this.$refs['create-dialog'].visible = true;
    },

    onCreateSuccess() {
      this.requestNormalApiList();
    },
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
