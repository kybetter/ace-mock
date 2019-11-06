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
        :selectedKeys="['CreateNew']"
        @click="openCreate"
      >
        <a-menu-item key="CreateNew">
          <a-icon type="plus-circle" />CreateNew
        </a-menu-item>
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
          <template>
            <a-menu-item key="/normalapi">NormalAPI</a-menu-item>
            <!-- <a-menu-item key="/graphql">GraphQL</a-menu-item> -->
          </template>
        </a-menu>
      </a-layout-sider>
      <a-layout style="margin: 24px; background:#fff;min-height: 280px;">
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>

    <create-dialog ref="create-dialog" />
  </a-layout>
</template>

<script>
import CreateDialog from './CreateDialog.vue';

export default {
  name: "Layout",
  components: {CreateDialog},
  data() {
    return {
      menuSelectedKeys: [],
      serverClosed: false,
    };
  },
  computed: {
    
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
    openCreate() {
      this.$refs['create-dialog'].visible = true;
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