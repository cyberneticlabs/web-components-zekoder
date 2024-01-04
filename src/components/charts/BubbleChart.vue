<template>
    <div ref="bubbleChart" :class="customClass" :style="styleObj">
        <chart type="bubble"  v-bind="extraProps"
        v-on="extraEvents" :options="options" :series="series" :width="width" :height="height"></chart>
    </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import * as axios from 'axios';
export default {
    name: 'ZekBubbleChart',
    components: {
        chart : VueApexCharts
    },
    props: {
        width: {
            type: [String, Number],
            default: ""
        },
        height: {
            type: [String, Number],
            default: ""
        },
        data: {
            type: Array,
            default: () => ([])
        },
        title: {
            type: [String,Object],
            default: ""
        },
        id: {
            type: [String, Number],
            default: ""
        },
        customClass: {
            type: String,
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        apiInfo: {  // {url, method:get|post, type:graphql||http, query}
            type: Object,
            default: () => ({})
        },
        xAxis: {   //{label,dataKey,tickSize,tickColor,type:category|datetime}
            type: Object,
            default: () => ({})
        },
        yAxis: {   //{label,tickSize,tickColor,series} // series: [{label, color, data[], dataKeys}]
            type: Object,
            default: () => ({})
        },
        showLegend: {
            type: Boolean,
            default: true
        },
        chartOptions: { // object to overwrite any of the chart option, or to add a new option.
            type: Object,
            default: () => { return {} }
        },
        extraProps: {
            type: Object,
            default: () => ({})
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chartData:[],
            series: [],
            options: {
                chart: {
                    id: 'bubble-chart' + this.id || '',
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            this.onSelect(event,chartContext,config);
                        }
                    }
                },
                noData: {
                    text: 'Loading...',
                    style: {
                        color: undefined,
                        fontSize: '20px'
                    }
                },
                fill: {
                    opacity: 0.7
                },
                xaxis: {
                    title: {
                        text: this.xAxis.label? (this.xAxis.label.text || this.xAxis.label) : undefined,
                        style: this.xAxis.label&&this.xAxis.label.style? this.xAxis.label.style : {}

                    },
                    labels: {
                        style: {
                            colors: this.xAxis.tickColor,
                            fontSize: this.xAxis.tickSize
                        }
                    }
                },
                yaxis:{
                    title: {
                        text: this.yAxis.label? (this.yAxis.label.text || this.yAxis.label) : undefined,
                        style: this.yAxis.label&&this.yAxis.label.style? this.yAxis.label.style : {}
                    },
                    labels: {
                        style: {
                            colors: this.yAxis.tickColor,
                            fontSize: this.yAxis.tickSize
                        }
                    }
                },
                title: {
                    text: this.title? (this.title.text || this.title) : undefined,
                    style: this.title&&this.title.style? this.title.style : {}

                },
                ...this.chartOptions
            },
        }
    },
    created() {
        //chart settings

        //chart data
        if(this.data && this.data.length) {
            this.chartData = this.data;
            this.populateGraph();
        } else if(this.apiInfo && this.apiInfo.url) {
            this.fetchData();
        } else {
            this.populateGraph();
        }
    },
    methods: {
        fetchData() {
            const method = this.apiInfo.method || (this.apiInfo.type=='graphql'? 'post' : 'get')
            axios({
                method: method,
                url: this.apiInfo.url,
                data: this.apiInfo.query || this.apiInfo.body || null
            })
            .then(res => {
                this.chartData = res.data;
                this.populateGraph();
            })
            .catch(err => {
                this.options.noData.text = 'Could not fetch data!';
                this.options.noData.style.color = 'rgb(255,0,0)';
            });
        },
        populateGraph() {
            if(this.yAxis && this.yAxis.series && this.yAxis.series.length) {
                this.yAxis.series.forEach((ser,index) => {
                    let data = [];
                    if(ser.data && ser.data.length) {
                        data = ser.data;
                    } else if(ser.dataKeys && this.chartData.length && ser.dataKeys.yValue && ser.dataKeys.zValue) {
                        if( ser.dataKeys.yValue in this.chartData[0] && ser.dataKeys.zValue in this.chartData[0]) {
                            data = this.chartData.map(item => {
                                return [
                                    +item[ser.dataKeys.xValue] || index,
                                    +item[ser.dataKeys.yValue],
                                    +item[ser.dataKeys.zValue]
                                ]
                            });
                        }
                    }
                    if (data.length < 1) {
                        return;
                    } else {
                        this.series.push({
                            name: ser.label || undefined,
                            data: data,
                            color: ser.color || undefined
                        });
                    }
                });
                if(this.series.length < 1){
                    this.options.noData.text = 'No data available!'
                    this.options.noData.style.color = 'rgb(255,0,0)';
                }
            }
        },
        onSelect(event, chartContext, config) {
            this.$emit('dataSelected', config);
        }
    }

}
</script>
