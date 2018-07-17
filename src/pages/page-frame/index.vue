<template>
  <div class="full-view-bg">
    <div class="content-view-bg" v-if="visible">
      <header-component></header-component>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
    import HeaderComponent from "./header";
    import AsideNav from "./aside-nav-analyze";
    import UserStorage from "../../store/user"
  export default {
      components: {HeaderComponent, AsideNav},
      name: 'pageFrame',
      data() {
          return {
              visible: true
          }
      },
      created() {
//          this.getMenus();
      },
      methods: {
          getMenus() {
              UserStorage.getMenus().then(list => {
                  this.visible = true;
              })
          }
      }
  }
</script>
<style scoped lang="less">
  @navWidth: 240px;
  @navBackgroundColor: #fff;
  .content-view-bg {
    position: relative;
    &:before {
      position: absolute;
      content: '';
      padding-top: 80px;
      z-index: -1;
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }
  .full-view-bg {
    min-width: 1300px;
    &:before {
      position: absolute;
      content: '';
      height: 100%;
      width: @navWidth;
      background-color: @navBackgroundColor;
    }
  }
</style>