<template>
  <a-modal title="新建接口" v-model="visible" @ok="handleOk" destroyOnClose>
    <a-form :form="form">
      <base-form :form="form" />
    </a-form>
  </a-modal>
</template>
<script>
import BaseForm from "./BaseForm";
import FormMxin from "./mixin";

export default {
  name: "CreateDialog",
  components: { BaseForm },
  mixins: [FormMxin],
  data() {
    return {};
  },
  methods: {
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$http.post("create-api", values).then(res => {
            if (res.data.code === 200) {
              this.$message.success("创建完成");
              this.visible = false;
              this.$emit("success", values);
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
  }
};
</script>
