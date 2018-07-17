<template>
  <div class="header-nav">
    <template v-for="nav in navs">
      <router-link class="header-nav-item" :to="nav.url">
        <span>{{nav.modulename}}</span>
      </router-link>
    </template>
  </div>
</template>
<script>
  export default {
      name: 'headerNav',
      data() {
          return {

          }
      },
      props: {
          navs: {
              default: function () {
                  return []
              }
          }
      },
      created() {
          this.initData();
      },
      methods: {
          initData() {}
      }
  }
</script>
<style lang="less" scoped>
  .header-nav {
    display: flex;
    justify-content: space-between;
    margin-right: 80px;
    .header-nav-item {
      display: inline-block;
      &.router-link-active,
      &:hover{
        span {
          color: #5181ed;
        }
      }
      &:last-child {
        span {
          border: none;
        }
      }
      span {
        display: inline-block;
        padding: 3px 25px;
        border-right: 1px solid #ccc;
        color: #787878;
        font-weight: bold;
      }
    }
  }
</style>