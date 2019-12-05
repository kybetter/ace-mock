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
    },
  },
  data() {
    return {
      editor: null
    };
  },
  mounted() {
    this.editor = monaco.editor.create(this.$refs.editor, {
      value: this.value,
      language: this.language,
      theme: this.theme
    });
    this.editor.onKeyUp(() => {
      this.$emit("change", this.editor.getValue());
    });
  },
  methods: {
    setValue(value) {
      this.editor.setValue(value);
    },
  },
};
</script>

<style></style>
