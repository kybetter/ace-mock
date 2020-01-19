<template>
  <a-modal title="编辑 API" v-model="visible" @ok="handleOk">
    <a-form :form="form">
      <base-form :form="form" :detail="detail" />
    </a-form>
  </a-modal>
</template>
<script>
import BaseForm from "./BaseForm";

export default {
  name: "EditDialog",
  components: { BaseForm },
  data() {
    return {
      visible: false,
      detail: {},
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
    this.form = this.$form.createForm(this, { name: "editMock" });
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
          this.$http
            .post("edit-api", {
              ...values,
              _id: this.detail._id
            })
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success("编辑完成");
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
      this.detail = {};
    }
  }
};
</script>
