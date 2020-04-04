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
      <a
        href="https://github.com/kybetter/ace-mock"
        target="_blank"
        style="color: white;"
      >
        <svg
          class="octicon octicon-mark-github v-align-middle"
          height="32"
          viewBox="0 0 16 16"
          version="1.1"
          width="32"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
      </a>
    </a-layout-header>
    <a-layout>
      <a-layout style="background: #fff;">
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
  },
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
.octicon {
  vertical-align: middle;
  fill: currentColor;
}
</style>
