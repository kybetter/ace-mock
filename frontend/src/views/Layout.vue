<template>
  <a-layout>
    <a-alert
      v-if="serverClosed"
      message="服务错误"
      description="本地服务被关闭了，请再次打开它，以便能够保存你做的修改。"
      type="error"
      showIcon
    />
    <a-layout-header class="header">
      <div class="logo">ace-mock</div>
      <a href="https://github.com/kybetter/ace-mock" target="_blank">github</a>
    </a-layout-header>
    <a-layout>
      <a-layout style="background:#fff;">
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "Layout",
  data() {
    return {
      serverClosed: false,
    };
  },
  created() {
    this.monitSocket();
  },
  methods: {
    monitSocket() {
      this.$io.on("connect_error", () => {
        this.serverClosed = true;
      });
      this.$io.on("reconnect", () => {
        this.serverClosed = false;
      });
    },
  }
};
</script>
<style lang="less" scoped>
.header {
  height: 46px;
  line-height: 46px;
  padding: 0 30px;
}
.logo {
  width: 170px;
  height: 46px;
  float: left;
  color: white;
  line-height: 42px;
  font-size: 28px;
}
</style>