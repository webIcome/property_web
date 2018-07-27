<template>
  <pie-echart-component :option="useOption"></pie-echart-component>
</template>
<script>
    export default {
        name: "pieChartComponent",
        data() {
            return {
                useOption: {},
                option: {
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
                },
            }
        },
        props: {
            data: {
                default: function () {
                    return {}
                }
            }
        },
        created(){
            this.initOption();
        },
        methods: {
            initOption() {
                let option = JSON.parse(JSON.stringify(this.option));
                option.series[0].data = this.data;
                this.useOption = option;
            },
        },
        watch: {
            data: function () {
                this.initOption()
            }
        }
    }
</script>
