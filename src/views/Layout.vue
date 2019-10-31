<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header class="header">
      <span class="logo">ace-mock</span>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['/']"
        :style="{ lineHeight: '64px' }"
        @click="goto"
      >
        <a-menu-item key="/">MockData</a-menu-item>
        <a-menu-item key="/newmock">NewMock</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu key="sub1">
            <span slot="title">
              <a-icon type="bars" />NormalAPI
            </span>
            <a-menu-item key="1">option1</a-menu-item>
            <a-menu-item key="2">option2</a-menu-item>
            <a-menu-item key="3">option3</a-menu-item>
            <a-menu-item key="4">option4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title">
              <a-icon type="profile" />GraphQL
            </span>
            <a-menu-item key="5">option5</a-menu-item>
            <a-menu-item key="6">option6</a-menu-item>
            <a-menu-item key="7">option7</a-menu-item>
            <a-menu-item key="8">option8</a-menu-item>
          </a-sub-menu>
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
  methods: {
    goto(path) {
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