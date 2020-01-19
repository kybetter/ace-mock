<template>
  <div>
    <a-form-item v-bind="formItemLayout" label="API 名字">
      <a-input
        v-decorator="[
          'apiName',
          {
            initialValue: detail.apiName,
            rules: [
              {
                required: true,
                message: '请输入 API 名字'
              }
            ]
          }
        ]"
        placeholder="API 名字将会在列表展示"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="方法">
      <a-select
        v-decorator="[
          'method',
          {
            initialValue: detail.method || 'POST'
          }
        ]"
      >
        <a-select-option value="POST">POST</a-select-option>
        <a-select-option value="GET">GET</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="API 路径">
      <a-input
        v-decorator="[
          'apiPath',
          {
            initialValue: detail.apiPath,
            rules: [
              {
                required: true,
                validator: validateApiPath
              }
            ]
          }
        ]"
        placeholder="应以 / 开头，将会在编辑器上方展示"
      />
    </a-form-item>
  </div>
</template>
<script>
export default {
  name: "BaseForm",
  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
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
  methods: {
    validateApiPath(rule, value, callback) {
      if (!value || value.length < 2) {
        callback("请输入 API 路径");
      } else if (value.indexOf("/") !== 0) {
        callback('API 应以 / 开头');
      } else {
        callback();
      }
    }
  }
};
</script>
