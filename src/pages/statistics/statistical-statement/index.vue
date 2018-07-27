<template>
  <div class="content-right">
    <div class="statistical-header">
      <params-component v-model="params"></params-component>
    </div>
    <div class="statistical-content">
      <chart-component :params="params" :isLine="isLine"></chart-component>
    </div>
  </div>
</template>
<script>
    import ParamsComponent from "./params-component";
    import ChartComponent from "./chart-component";
  export default {
      components: {ChartComponent, ParamsComponent},
      name: 'statisticalStatementPage',
      data() {
          return {
              params: {},
          }
      },
      created() {},
      computed: {
          isLine: function () {
              return true
          }
      },
      methods: {

      },

  }
</script>
<style lang="less" scoped>
  .content-right {
    color: #787878;
    .statistical-header {
      background: #fff;
      padding: 20px 45px;
      margin-bottom: 22px;
      box-shadow: 0 0 5px #ccc;
    }
    .statistical-content {
      box-shadow: 0 0 5px #ccc;
      background: #fff;
    }
  }

</style>