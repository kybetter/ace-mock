<template>
  <a-modal title="新建 API" v-model="visible" @ok="handleOk">
    <a-form :form="form">
      <base-form :form="form" />
    </a-form>
  </a-modal>
</template>
<script>
import BaseForm from "./BaseForm";

export default {
  name: "CreateDialog",
  components: { BaseForm },
  data() {
    return {
      visible: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "newMock" });
  },
  watch: {
    visible(val) {
      if (!val) {
        this.afterClose();
      }
    }
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

    afterClose() {
      this.form.resetFields();
    },
  }
};
</script>
