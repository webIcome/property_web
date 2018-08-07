<template>
  <div class="chart-items" >
    <template v-for="item in data">
      <div class="chart-item" :ref="test">
        <pie-echart-component v-if="visible" :option="getOption(item)"></pie-echart-component>
      </div>
    </template>
  </div>
</template>
<script>
    export default {
        name: "pieChartComponent",
        data() {
            return {
                visible: false,
                test: 'test',
                option: {
                    color: ['#bfbfbf', '#eb6877', '#5181ed', '#FF854A'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {d}%",
                    },
                    legend: {
                        bottom: 'center',
                        orient: 'vertical',
                        right: 20,
                        itemGap: 20,
                        icon: 'circle'
                    },
                    title: {
                        text:'',
                        left:'center',
                        top:'center',
                        textStyle:{
                            color:'#618ced',
                            fontSize:20,
                            align:'center'
                        }
                    },
                    series: [
                        {
                            name:'访问来源',
                            type:'pie',
                            radius: ['65%', '80%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 5, name: '正常'},
                                {value: 5, name: '故障'},
                            ]
                        }
                    ]
                },
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

        },
        mounted() {
            this.$nextTick(() => {
                this.generateHeight();
                this.visible = true;
            })
        },
        methods: {
            getOption(item) {
                let option = JSON.parse(JSON.stringify(this.option));
                let number = 0;
                item.series.forEach(data => {
                    number += data.value;
                });
                option.series[0].data = item.series;
                option.title.text = item.name + '\n\n' + number;
                option.legend.data = item.xAxisData;
                return option
            },
            generateHeight() {
                this.$refs[this.test].forEach(item => {
                    item.style.height = item.offsetWidth * 1/2 + 'px';
                })
            },
        },
    }
</script>
<style lang="less" scoped>
  .chart-items {
    display: flex;
    flex-wrap: wrap;
    padding-top: 50px;
    padding-right: 50px;
    .chart-item {
      width: 33.3%;
      margin-bottom: 50px;
    }
  }
</style>
