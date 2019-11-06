<template>
  <div>
    <a-row>
      <a-col :span="6">
        <div class="list">
          <div class="list-header">
            <a-input class="search-input" placeholder="search keywords（coming soon）"></a-input>
          </div>
          <div class="list-content">
            <div v-for="item in lists" :key="item.id" class="list-wrapper">
              <div
                @click="clickItem(item)"
                :class="['list-item', {active: item.id === currentApi.id}]"
              >
                <span>[{{item.method}}]&nbsp;</span>
                <span>{{item.name}}</span>
              </div>
              <div class="option">
                <a-button @click="editApi(item)" size="small" icon="edit"></a-button>&nbsp;
                <a-button type="danger" size="small" icon="delete"></a-button>
              </div>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="18">
        <textarea ref="editor"></textarea>
      </a-col>
    </a-row>

    <edit-dialog ref="edit-api"></edit-dialog>
  </div>
</template>
<script>
import EditDialog from './EditDialog.vue';
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/keymap/sublime.js";
import "codemirror/addon/lint/javascript-lint.js";
import "codemirror/addon/lint/json-lint.js";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/comment/comment.js";

export default {
  name: 'NormalAPI',
  components: {EditDialog},
  data() {
    return {
      editor: null
    };
  },
  created() {
    this.$store.dispatch("requestNormalApiList");
  },
  computed: {
    lists() {
      return this.$store.state.normalApiList;
    },
    currentApi() {
      return this.$store.state.currentApi;
    }
  },
  watch: {
    currentApi(val) {
      // after create api and click list, set editor value
      if (val) {
        this.editor.setValue(val.content);
      }
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
      tabSize: 2,
      theme: "monokai",
      mode: "application/json",
      lineNumbers: true,
      line: true,
      keyMap: "sublime",
      gutters: [
        "CodeMirror-linenumbers",
        "CodeMirror-foldgutter",
        "CodeMirror-lint-markers"
      ],
      lint: true,
      smartIndent: true
    });

    this.editor.on("change", () => {
      this.setValue();
    });
  },
  methods: {
    clickItem(item) {
      if (this.currentApi.id === item.id) return;
      this.$store.dispatch("requestNormalApiList").then(() => {
        this.$store.commit("setCurrentApi", item);
      });
    },
    setValue() {
      this.$io.emit("setValue", {
        id: this.currentApi.id,
        name: this.currentApi.name,
        content: this.editor.getValue()
      });
    },
    editApi(item) {
      item.type = "NormalAPI";
      this.$refs['edit-api'].formData = item;
      this.$refs['edit-api'].visible = true;
    }
  },
  beforeDestroy() {
    this.$store.commit("setNormalApiList", []);
    this.$store.commit("setCurrentApi", {});
  }
};
</script>
<style>
.CodeMirror {
  height: calc(100vh - 94px);
}
</style>
<style scoped lang="less">
.search-input {
  border-radius: 0;
  border-color: #e8e8e8;
}
.list {
  .list-content {
    height: calc(100vh - 126px);
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