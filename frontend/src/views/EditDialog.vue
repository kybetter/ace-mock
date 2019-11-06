<template>
  <a-modal title="Edit" v-model="visible" @ok="handleOk">
    <a-form :form="form">
      <a-form-item v-bind="formItemLayout" label="type">
        <a-select
          v-decorator="[
            'type',
            {
              initialValue: formData.type,
            }
          ]"
          @change="changeType"
        >
          <a-select-option value="NormalAPI">NormalAPI</a-select-option>
          <!-- <a-select-option value="GraphQL">GraphQL</a-select-option> -->
        </a-select>
      </a-form-item>
      <template v-if="formData.type === 'NormalAPI'">
        <a-form-item v-bind="formItemLayout" label="method">
          <a-select
            v-decorator="[
              'method',
              {
                initialValue: formData.method,
              }
            ]"
          >
            <a-select-option value="POST">POST</a-select-option>
            <a-select-option value="GET">GET</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="name">
          <a-input
            v-decorator="[
            'name',
            {
              initialValue: formData.name,
              rules: [
                {
                  required: true,
                  validator: validateApi,
                }
              ],
            },
          ]"
            placeholder="Please fill in api url, start with '/'"
          />
        </a-form-item>
      </template>
      <a-form-item v-else v-bind="formItemLayout" label="name">
        <a-input
          v-decorator="[
          'name',
          {
            initialValue: formData.name,
            rules: [
              {
                required: true,
                message: 'Please fill in name',
              },
            ],
          },
        ]"
          placeholder="Please fill in name"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
export default {
  name: "CreateDialog",
  data() {
    return {
      visible: false,
      initialType: "NormalAPI",
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
          values.id = this.formData.id;
          this.$http.post("edit-normal-api", values).then(res => {
            if (res.data.code === 200) {
              this.$message.success("DONE");
              this.$store.dispatch("requestNormalApiList");
              this.$store.commit("setCurrentApi", res.data.data);
              this.visible = false;
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    changeType(val) {
      this.initialType = val;
    },
    validateApi(rule, value, callback) {
      if (!value || value.length < 2) {
        callback('Please fill in api url');
      } else if (value.indexOf('/') !== 0) {
        callback('api must be start with "/"');
      } else {
        callback();
      }
    }
  }
};
</script>
