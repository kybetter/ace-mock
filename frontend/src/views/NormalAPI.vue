<template>
  <div>
    <a-row>
      <a-col :span="6">
        <div class="list">
          <div class="list-header">
            <a-input class="search-input" placeholder="search keywords"></a-input>
          </div>
          <div class="list-content">
            <div
              @click="clickItem(item)"
              :class="['list-item', {active: item.id === currentApi.id}]"
              v-for="item in lists"
              :key="item.id"
            >
              <span>[{{item.method}}]&nbsp;</span>
              <span>{{item.name}}</span>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :span="18">
        <textarea ref="editor"></textarea>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
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
    '$store.state.currentApi'(val) {
      // after create api and click list, set editor value
      this.editor.setValue(val.content);
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
        // console.log(234);
        // this.editor.setValue(item.content);
      });
    },
    setValue() {
      this.$io.emit("setValue", {
        id: this.currentApi.id,
        name: this.currentApi.name,
        content: this.editor.getValue()
      });
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
    .list-item {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      border-bottom: 1px solid #e8e8e8;
      cursor: pointer;
    }
    .list-item:hover {
      background: #1890ff;
      color: white;
    }
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