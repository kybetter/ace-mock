<template>
  <a-modal title="编辑接口" v-model="visible" @ok="handleOk" destroyOnClose>
    <a-form :form="form">
      <base-form :form="form" :detail="detail" />
    </a-form>
  </a-modal>
</template>
<script>
import BaseForm from "./BaseForm";
import FormMxin from "./mixin";

export default {
  name: "EditDialog",
  mixins: [FormMxin],
  components: { BaseForm },
  data() {
    return {};
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
  }
};
</script>
