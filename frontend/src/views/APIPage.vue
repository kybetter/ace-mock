<template>
  <div>
    <a-row>
      <a-col :span="5">
        <div class="list">
          <div class="list-header">
            <a-select
              :defaultValue="editorLanguage"
              style="width: 100%;"
              class="select-style"
              @change="handleLanguageChange"
            >
              <a-select-option value="json">编辑器语言：JSON</a-select-option>
              <a-select-option value="html">编辑器语言：HTML</a-select-option>
            </a-select>
            <a-input
              class="search-input"
              placeholder="搜索"
              v-model="searchText"
            ></a-input>
            <div class="create">
              <a-button icon="plus" type="link" @click="openCreateApi"
                >create new</a-button
              >
            </div>
          </div>
          <div class="list-content">
            <div
              v-for="item in filterAPIList"
              :key="item.doc._id"
              class="list-wrapper"
            >
              <a-row
                :class="[
                  'list-item',
                  { active: item.doc._id === currentApi._id }
                ]"
              >
                <a-col :span="6">
                  <a-tag color="blue" v-if="item.doc.method === 'POST'">{{
                    item.doc.method
                  }}</a-tag>
                  <a-tag color="cyan" v-else>{{ item.doc.method }}</a-tag>
                </a-col>
                <a-col :span="18" @click="setCurrentApi(item)">{{
                  item.doc.apiName
                }}</a-col>
              </a-row>
              <div class="option">
                <a-button
                  @click="openEditApi(item)"
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
        <div class="api-url">
          <a-button size="small" class="copy" @click="handleCopy">复制完整 URL</a-button>
          <span>API 路径：{{ apiPath }}</span>
        </div>
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
    <create-api ref="create-api" @success="handleSuccess" />
    <edit-api ref="edit-api" @success="handleSuccess" />
  </div>
</template>
<script>
import copy from 'copy-to-clipboard';
import Editor from "@/components/Editor.vue";
import CreateApi from "./form/Create.vue";
import EditApi from "./form/Edit.vue";

export default {
  name: "NormalAPI",
  components: { CreateApi, EditApi, Editor },
  data() {
    return {
      editor: null,
      editorValue: "",
      editorLanguage: "json",
      apiList: [],
      currentApi: {},
      searchText: ""
    };
  },
  computed: {
    isSetCurrentApi() {
      return Object.keys(this.currentApi).length > 0;
    },
    filterAPIList() {
      if (this.apiList.length === 0) return [];

      return this.apiList.filter(
        item => item.doc.apiName.indexOf(this.searchText) !== -1
      );
    },
    apiPath() {
      return this.currentApi.apiPath || "--";
    },
    showCopyBtn() {
      return !!this.currentApi.apiPath;
    }
  },
  created() {
    this.requestNormalApiList();
  },
  methods: {
    handleCopy() {
      if (copy(`http://localhost:${window.location.port}${this.currentApi.apiPath}`)) {
        this.$message.success('复制完成');
      } else {
        this.$message.error('复制失败，请报 issue 给我');
      }
    },
    handleLanguageChange(value) {
      this.editorLanguage = value;
    },

    requestNormalApiList() {
      return this.$http.post("api-list").then(res => {
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
          content
        });
      }
    },

    openEditApi(item) {
      this.$refs["edit-api"].visible = true;
      this.$refs["edit-api"].detail = item.doc;
    },

    openCreateApi() {
      this.$refs["create-api"].visible = true;
    },

    async handleSuccess(value) {
      try {
        await this.requestNormalApiList();
        this.apiList.forEach(item => {
          if (item.doc.apiPath === value.apiPath) {
            this.currentApi = item.doc;
            this.$refs.editor.setValue(this.currentApi.content);
          }
        });
      } catch (e) {
        throw e;
      }
    },

    deleteApi(item) {
      this.$http.post("delete-api", item.doc).then(() => {
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
.api-url {
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
}
.editor {
  height: calc(100vh - 78px);
}
.create {
  text-align: center;
}
.search-input {
  border-radius: 0;
  border-color: #e8e8e8;
}
.select-style {
  /deep/ .ant-select-selection {
    border-radius: 0;
  }
}
.cover-container {
  position: relative;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    z-index: 999;
    cursor: not-allowed;
  }
}
.list {
  .list-content {
    height: calc(100vh - 142px);
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
          background: rgba(24, 144, 255, 0.7);
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
      background: rgba(24, 144, 255, 0.7);
      color: white;
    }
  }
}
.copy {
  font-size: 12px;
  margin-right: 10px;
}
</style>
