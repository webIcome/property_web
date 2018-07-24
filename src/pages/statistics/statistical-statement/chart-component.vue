<template>
  <div class="statistics-chart">
    <pie-echart-component v-if="visible" :option="pieOption"></pie-echart-component>
  </div>
</template>
<script>
  export default {
      name: "chartComponent",
      data() {
          return {
              visible: true,
              lineOption: {
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

                  series: [{
                      type: 'line',
                      smooth: true,
                      name: '',
                      areaStyle: {
                          color: {
                              type: 'linear',
                              x: 0,
                              y: 0,
                              x2: 0,
                              y2: 1,
                              colorStops: [{
                                  offset: 0.3, color: '#44B5FD'
                              }, {
                                  offset: 0.93, color: 'rgba(110,193,246, 0.17)'
                              }],
                          }
                      },
                      lineStyle: {
                          color: '#44B5FD',
                          width: 3,
                      },
                      itemStyle: {
                          opacity: 0
                      }
                  }]
              },
              pieOption: {
                  color: ['#5282E6', '#7654DF', '#FF6668', '#FF854A', '#5282E6'],
                  tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {d}%",
                  },
                  title: {
                      text:'故障率',
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
                          radius: ['75%', '90%'],
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
              }
          }
      },
      props: {
          params: {
              default: function () {
                  return {}
              }
          }
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