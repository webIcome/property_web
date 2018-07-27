<template>
  <div class="line">
    <line-echart-component :option="useOption"></line-echart-component>
  </div>
</template>
<script>
    export default {
        name: "lineChartComponent",
        data() {
            return {
                useOption: {},
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
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        nameTextStyle: {
                            color: '#8FABD2',
                        },
                        name: '日',
                        axisLabel: {
                            color: '#8FABD2'
                        },
                        axisLine: {
                            show: false,
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
                                color: '#ddd',

                            }
                        },
                        nameTextStyle: {
                            color: '#8FABD2',
                            padding: [10,10,20,10]
                        },
                        name: 'Wh',
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#8FABD2'
                        },
                    },
                    series: []
                },
                series: {
                    type: 'line',
                    smooth: true,
                    name: '',
                    lineStyle: {
                        color: '#44B5FD',
                        width: 3,
                    },
                    itemStyle: {
                        opacity: 0
                    }
                }
            }
        },
        props: {
            data: {
                default: function () {
                    return []
                }
            }
        },
        created(){
            this.initOption();
        },
        methods: {
            initOption() {
                let option = JSON.parse(JSON.stringify(this.option));
                this.data.forEach(item => {
                    option.series.push(this.getSeries(item))
                });
                this.useOption = option;
            },
            getSeries(data) {
                let series = JSON.parse(JSON.stringify(this.series));
                series.data = data;
                return series;
            }
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
    height: 400px;
  }
</style>
