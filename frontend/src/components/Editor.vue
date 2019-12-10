<template>
  <div ref="editor" id="editor"></div>
</template>

<script>
import * as monaco from "monaco-editor";

export default {
  name: "Editor",
  props: {
    language: {
      type: String,
      default: "json"
    },
    theme: {
      type: String,
      default: "vs-dark"
    }
  },
  data() {
    return {
      editor: null,
      model: null,
    };
  },
  watch: {
    language(l) {
      monaco.editor.setModelLanguage(this.model, l);
    },
  },
  mounted() {
    this.model = monaco.editor.createModel('', this.language);
    this.editor = monaco.editor.create(this.$refs.editor, {
      model: this.model,
      theme: this.theme,
      autoClosingBrackets: true,
      autoClosingOvertype: true,
      autoClosingQuotes: true,
      autoIndent: true,
      emptySelectionClipboard: true,
      fontSize: 16,
    });
    this.editor.onKeyUp(() => {
      this.$emit("change", this.editor.getValue());
    });
  },
  methods: {
    setValue(value) {
      this.editor.setValue(value);
    }
  }
};
</script>

<style></style>
