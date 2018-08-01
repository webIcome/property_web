<template>
  <div class="line" :ref="test">
    <line-echart-component v-if="visible" :option="useOption"></line-echart-component>
  </div>
</template>
<script>
    export default {
        name: "lineChartComponent",
        data() {
            return {
                visible: false,
                test: 'test',
                useOption: {},
                color: ['#bfbfbf', '#eb6877', '#5181ed', '#FF854A', '#5282E6'],
                option: {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: [],
                        bottom: 0,
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        nameTextStyle: {
                            color: '#787878',
                            padding: [0, 0, 0, 10],
                        },
                        name: this.xName,
                        axisLabel: {
                            color: '#787878'
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#787878'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 0.15,
//                                color: '#ddd',

                            }
                        },
                        nameTextStyle: {
                            color: '#787878',
                            padding: [10,60,20,10],
                        },
                        name: this.$t("statistics.statisticalStatement.alarmNumber"),
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#787878'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#787878'
                        },
                    },
                    series: []
                },
                series: {
                    type: 'line',
                    smooth: true,
                    name: '',
                }
            }
        },
        props: {
            data: {
                default: function () {
                    return {}
                }
            },
            xName: ''
        },
        created(){
            this.initOption();
        },
        mounted() {
            this.$nextTick(() => {
                this.generateHeight();
                this.visible = true;
            })
        },
        methods: {
            initOption() {
                let option = JSON.parse(JSON.stringify(this.option));
                this.data.series.forEach(item => {
                    option.series.push(this.getSeries(item.data, item.name))
                    option.legend.data.push(item.name)
                });
                option.xAxis.data = this.data.xAxisData;
                this.useOption = option;
            },
            getSeries(data, name) {
                let series = JSON.parse(JSON.stringify(this.series));
                series.data = data;
                series.name = name;
                return series;
            },
            generateHeight() {
                this.$refs[this.test].style.height = this.$refs[this.test].offsetWidth * 1/3 + 'px';
            },
        },
        watch: {
            data: function () {
                this.initOption()
            }
        }
    }
</script>
<style lang="less" scoped>
  .line {
    padding: 50px 0;
  }
</style>
