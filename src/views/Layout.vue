<template>
  <a-layout>
    <a-layout-header class="header">
      <span class="logo">ace-mock</span>
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        :selectedKeys="navSelectedKeys"
        @click="navClick"
      >
        <a-menu-item key="/mockdata">MockData</a-menu-item>
        <a-menu-item key="/newmock">NewMock</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
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
  components: {
  },
  data() {
    return {
      navSelectedKeys: ['/mockdata'],
      menuSelectedKeys: ['/mockdata/normalapi'],
    }
  },
  computed: {
    isMockdata() {
      return this.$route.path === '/' || this.$route.path.indexOf('mockdata') !== -1;
    }
  },
  methods: {
    navClick(path) {
      this.navSelectedKeys = [path.key];
      this.menuSelectedKeys = [path.key + '/normalapi'];
      this.$router.push(path.key + '/normalapi');
    },
    menuClick(path) {
      this.menuSelectedKeys = [path.key];
      this.$router.push(path.key);
    }
  }
};
</script>
<style lang="less" scoped>
.logo {
  width: 120px;
  height: 30px;
  // background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
  color: white;
  line-height: 30px;
  font-size: 26px;
}
</style>