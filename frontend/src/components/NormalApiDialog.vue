<template>
  <a-modal title="Create" v-model="visible" @ok="handleOk" @afterClose="afterClose">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="method">
        <a-select
          v-decorator="[
            'method',
            {
              initialValue: formData.method || 'POST'
            }
          ]"
        >
          <a-select-option value="POST">POST</a-select-option>
          <a-select-option value="GET">GET</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="api">
        <a-input
          v-decorator="[
            'api',
            {
              initialValue: formData.api,
              rules: [
                {
                  required: true,
                  validator: validateApi
                }
              ]
            }
          ]"
          placeholder="Please fill in api url, start with '/'"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "CreateNormalDialog",
  data() {
    return {
      visible: false,
      type: "create",
      formData: {},
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
  methods: {
    handleOk(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.type === "create") {
            this.$http.post("create-normal-api", values).then(res => {
              if (res.data.code === 200) {
                this.$message.success("DONE");
                this.visible = false;
                this.$emit("success", values);
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            this.$http.post("edit-normal-api", {
              ...values,
              _id: this.formData._id,
            }).then(res => {
              if (res.data.code === 200) {
                this.$message.success("DONE");
                this.visible = false;
                this.$emit("success", values);
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        }
      });
    },

    afterClose() {
      this.formData = {};
      this.form.resetFields();
    },

    validateApi(rule, value, callback) {
      if (!value || value.length < 2) {
        callback("Please fill in api url");
      } else if (value.indexOf("/") !== 0) {
        callback('api must be start with "/"');
      } else {
        callback();
      }
    }
  }
};
</script>
