<template>
  <a-layout>
    <a-alert
      v-if="serverClosed"
      message="Server Error"
      description="Your local server seems to be closed, plase reopen it to save your changes."
      type="error"
      showIcon
    />
    <a-layout-header class="header">
      <div class="logo">ace-mock</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :selectedKeys="menuSelectedKeys"
        @click="menuClick"
      >
        <a-menu-item key="/normalapi">NormalAPI</a-menu-item>
      </a-menu>
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
      menuSelectedKeys: [],
      serverClosed: false,
    };
  },
  created() {
    this.setSelectedKeys();
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
    menuClick(path) {
      this.menuSelectedKeys = [path.key];
      this.$router.push(path.key);
    },
    setSelectedKeys() {
      const {path} = this.$route;
      if (path === '/') {
        this.menuSelectedKeys = ["/normalapi"];
      } else {
        this.menuSelectedKeys = [path];
      }
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
.sider {
  min-height: calc(100vh - 46px);
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