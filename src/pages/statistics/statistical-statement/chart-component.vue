<template>
  <div class="statistics-chart">
    <line-chart-component v-if="isLine" :data="data"></line-chart-component>
    <pie-chart-component v-else :data="data"></pie-chart-component>
  </div>
</template>
<script>
    import LineChartComponent from "./line-chart-component";
    import PieChartComponent from "./pie-chart-component";
  export default {
      components: {PieChartComponent, LineChartComponent}, name: "chartComponent",
      data() {
          return {
              visible: true,
              data:  [[820, 932, 901, 934, 1290, 1330, 1320]]
          }
      },
      props: {
          params: {
              default: function () {
                  return {}
              }
          },
          isLine: ''
      },
      computed: {

      },
      mounted() {
          this.$nextTick(() => {
              this.visible = true;
          })
      },
      methods: {
          
      },
      watch: {
          params: function () {

          }
      }
  }
</script>
<style lang="less" scoped>
  .statistics-chart {
    padding: 50px;
  }
</style>