<template>
  <div class="statistics-chart">
    <template v-if="visible">
      <line-chart-component v-if="isLine" :data="data" :xName="xName"></line-chart-component>
      <pie-chart-component v-else :data="data"></pie-chart-component>
    </template>
  </div>
</template>
<script>
    import LineChartComponent from "./line-chart-component";
    import PieChartComponent from "./pie-chart-component";
    import Service from '../../../services/data-analyse'
    export default {
        components: {PieChartComponent, LineChartComponent},
        name: "chartComponent",
        data() {
            return {
                visible: true,
                data: [[820, 932, 901, 934, 1290, 1330, 1320]]
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
        created() {
        },
        computed: {
            xName: function () {
                let type;
                switch (this.params.dimension) {
                    case 1:
                        type = this.$t("statistics.statisticalStatement.year");
                        break;
                    case 2:
                        type = this.$t("statistics.statisticalStatement.month");
                        break;
                    case 3:
                        type = this.$t("statistics.statisticalStatement.day");
                        break;
                }
                return type;
            }
        },
        mounted() {

        },
        methods: {
            getData() {
                let fn;
                if (this.isLine) {
                    fn = Service.findReportData
                    this.data = {series: [{name: '系统', type: '2017', data: [1,2]}
                    ,{name: '普通', type: '2017', data: [2,3]}], xAxisData: ['2017', '2018']}
                } else {
                    fn = Service.findCurrentReportData
                    this.data = [{name: '系统', series: [{name: '紧急', value: 2},{name: '普通', value: 1}], xAxisData: ['普通', '紧急']},
                        {name: '系统', series: [{name: '紧急', value: 2},{name: '普通', value: 1}], xAxisData: ['普通', '紧急']},
                        {name: '系统', series: [{name: '紧急', value: 2},{name: '普通', value: 1}], xAxisData: ['普通', '紧急']},
                        {name: '系统', series: [{name: '紧急', value: 2},{name: '普通', value: 1}], xAxisData: ['普通', '紧急']}]
                }
                fn(this.params).then(data => {
//                    this.data = data;
                })
            }
        },
        watch: {
            params: function () {
                this.visible = false;
                this.$nextTick(() => {
                    this.visible = true;
                })
                this.getData()
            }
        }
    }
</script>
<style lang="less" scoped>
  .statistics-chart {
    /*padding: 50px 50px 0 20px;*/
  }
</style>