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
              @click="clickItem(list)"
              :class="['list-item', {active: list.id === currentList.id}]"
              v-for="list in lists"
              :key="list.id"
            >
              <span>[{{list.method}}] </span><span>{{list.name}}</span>
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
      lists: [],
      currentList: {},
      editor: null
    };
  },
  created() {
    this.getNormalApiLists();
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.editor, {
      tabSize: 2,
      theme: "monokai",
      mode: "application/json",
      lineNumbers: true,
      line: true,
      keyMap: 'sublime',
      gutters:["CodeMirror-linenumbers", "CodeMirror-foldgutter","CodeMirror-lint-markers"],
      lint: true,
      smartIndent : true,
    });

    this.editor.on('change', () => {
      this.$io.emit('setValue', 
        {
          id: this.currentList.id,
          name: this.currentList.name,
          content: this.editor.getValue()
        }
      )
    })
  },
  methods: {
    clickItem(list) {
      this.currentList = list;
      this.editor.setValue(this.currentList.content);
    },
    getNormalApiLists() {
      this.$http.post('get-normal-api-list').then(res => {
        this.lists = res.data.data;
      })
    }
  }
};
</script>
<style>
.CodeMirror {
  height: 572px;
}
</style>
<style scoped lang="less">
.search-input {
  border-radius: 0;
  border-color: #e8e8e8;
}
.list {
  .list-content {
    height: 540px;
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