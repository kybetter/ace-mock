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
        :selectedKeys="navSelectedKeys"
        @click="navClick"
      >
        <a-menu-item key="/mockdata">MockData</a-menu-item>
        <a-menu-item key="/newmock">NewMock</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider">
        <a-menu
          mode="inline"
          :selectedKeys="menuSelectedKeys"
          :style="{ height: '100%', borderRight: 0 }"
          @click="menuClick"
        >
          <template v-if="isMockdata">
            <a-menu-item key="/mockdata/normalapi">NormalAPI</a-menu-item>
            <a-menu-item key="/mockdata/graphql">GraphQL</a-menu-item>
          </template>
          <template v-else>
            <a-menu-item key="/newmock/normalapi">NormalAPI</a-menu-item>
            <a-menu-item key="/newmock/graphql">GraphQL</a-menu-item>
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="margin: 24px; background:#fff;min-height: 280px;">
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
  components: {},
  data() {
    return {
      navSelectedKeys: [],
      menuSelectedKeys: [],
      serverClosed: false,
    };
  },
  computed: {
    isMockdata() {
      return (
        this.$route.path === "/" || this.$route.path.indexOf("mockdata") !== -1
      );
    }
  },
  created() {
    this.setSelectedKeys();
    this.monitSocket();
  },
  methods: {
    monitSocket() {
      this.$io.on("connect_error", err => {
        this.serverClosed = true;
      });
      this.$io.on("reconnect", number => {
        this.serverClosed = false;
      });
    },
    navClick(path) {
      this.navSelectedKeys = [path.key];
      this.menuSelectedKeys = [path.key + "/normalapi"];
      this.$router.push(path.key + "/normalapi");
    },
    menuClick(path) {
      this.menuSelectedKeys = [path.key];
      this.$router.push(path.key);
    },
    setSelectedKeys() {
      const {path} = this.$route;
      if (path === '/') {
        this.navSelectedKeys = ["/mockdata"];
        this.menuSelectedKeys = ["/mockdata/normalapi"];
      } else {
        this.navSelectedKeys = ['/' + path.split('/')[1]];
        this.menuSelectedKeys = [path];
      }
    }
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