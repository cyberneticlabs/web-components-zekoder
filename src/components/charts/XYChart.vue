<template>
    <div :class="customClass" :style="styleObj">
        <chart
            :options="options"
            :series="series"
            :width="width"
            :height="height"
            v-on="extraEvents"
            v-bind="extraProps"
            ref="zekXYChart"
        ></chart>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import * as axios from "axios";
export default {
    name: "ZekXYChart",
    components: {
        chart: VueApexCharts
    },
    props: {
        type: {
            type: String,
            default: ""
        },
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
            default: () => []
        },
        title: {
            type: [String, Object],
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
        apiInfo: {
            // {url, method:get|post, type:graphql||http, query}
            type: Object,
            default: () => ({})
        },
        xAxis: {
            //{label,dataKey,tickSize,tickColor,data,type:category|datetime}
            type: Object,
            default: () => ({})
        },
        yAxis: {
            //{label,tickSize,tickColor,series} // series: [{label, color, data[], dataKey}]
            type: Object,
            default: () => ({})
        },
        showLegend: Boolean,
        legend: {
            // https://apexcharts.com/docs/options/legend/
            type: Object,
            default: () => ({})
        },
        grid: {
            // https://apexcharts.com/docs/options/grid/
            type: Object,
            default: () => ({})
        },
        toolbar: {
            // https://apexcharts.com/docs/options/chart/toolbar/
            type: Object,
            default: () => ({})
        },
        showTooltip: {
            type: Boolean,
            default: false
        },
        tooltip: {
            // https://apexcharts.com/docs/options/tooltip/
            type: Object,
            default: () => ({})
        },
        dataLabels: {
            // https://apexcharts.com/docs/options/datalabels/
            type: Object,
            default: () => ({})
        },
        states: {
            // https://apexcharts.com/docs/options/states/
            type: Object,
            default: () => ({})
        },
        gradient: {
            type: Object,
            default: () => ({})
        },
        plotOptions: {
            // https://apexcharts.com/docs/options/plotoptions/
            type: Object,
            default: () => ({})
        },
        extraOptions: {
            type: Object,
            default: () => ({})
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
            chartData: [],
            series: [],
            options: {
                colors: [],
                grid: {
                    show: false,
                    ...this.grid
                },
                tooltip: {
                    enabled: this.showTooltip,
                    ...this.tooltip
                },
                fill: this.gradient ? this.createGradient(this.gradient) : {},
                states: {
                    active: {
                        filter: {
                            type: "none"
                        }
                    },
                    hover: {
                        filter: {
                            type: "none"
                        }
                    },
                    ...this.states
                },
                chart: {
                    id: `xy-chart-${this.id}`,
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            this.$emit("dataPointSelection", config);
                        }
                    },
                    stacked: this.type == "stacked-bar" ? true : null,
                    toolbar: {
                        show: false,
                        ...this.toolbar
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: this.type == "horizontal-bar" ? true : null,
                        borderRadius: this.yAxis && this.yAxis.borderRadius ? this.yAxis.borderRadius : 0,
                        borderRadiusApplication: "end"
                    },
                    ...this.plotOptions
                },
                noData: {
                    text: "Loading...",
                    style: {
                        color: undefined,
                        fontSize: "20px"
                    }
                },
                xaxis: {
                    title: {
                        text: this.xAxis.label ? this.xAxis.label.text || this.xAxis.label : undefined,
                        style: this.xAxis.label && this.xAxis.label.style ? this.xAxis.label.style : {}
                    },
                    labels: {
                        show: this.xAxis.show,
                        style: {
                            colors: this.xAxis.tickColor,
                            fontSize: this.xAxis.tickSize
                        },
                        ...this.xAxis.labels
                    },
                    axisBorder: {
                        show: this.xAxis.show,
                        ...this.xAxis.axisBorder
                    },
                    axisTicks: {
                        show: this.xAxis.show,
                        ...this.xAxis.axisTicks
                    }
                },
                yaxis: {
                    title: {
                        text: this.yAxis.label ? this.yAxis.label.text || this.yAxis.label : undefined,
                        style: this.yAxis.label && this.yAxis.label.style ? this.yAxis.label.style : {}
                    },
                    labels: {
                        style: {
                            colors: this.yAxis.tickColor,
                            fontSize: this.yAxis.tickSize
                        }
                    }
                },
                title: {
                    text: this.title ? this.title.text || this.title : undefined,
                    style: this.title && this.title.style ? this.title.style : {}
                },
                legend: {
                    show: this.showLegend,
                    ...this.legend
                },
                dataLabels: {
                    enabled: false,
                    ...this.dataLabels
                },
                ...this.extraOptions
            }
        };
    },
    created() {
        //chart settings
        if (this.type == "horizontal-bar") {
            this.options.chart.type = "bar";
        } else if (this.type == "stacked-bar") {
            this.options.chart.type = "bar";
        } else {
            this.options.chart.type = this.type;
        }
        //chart data
        if (this.data && this.data.length) {
            this.chartData = this.data;
            this.populateGraph();
        } else if (this.apiInfo && this.apiInfo.url) {
            this.fetchData();
        } else {
            this.populateGraph();
        }
    },
    methods: {
        fetchData() {
            const method = this.apiInfo.method || (this.apiInfo.type == "graphql" ? "post" : "get");
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
                    this.options.noData.text = "Could not fetch data!";
                    this.options.noData.style.color = "rgb(255,0,0)";
                });
        },
        populateGraph() {
            if (this.yAxis && this.yAxis.series && this.yAxis.series.length) {
                this.yAxis.series.forEach(ser => {
                    let data = [];
                    if (ser.data && ser.data.length) {
                        data = ser.data;
                    } else if (ser.dataKey && this.chartData.length && ser.dataKey in this.chartData[0]) {
                        data = this.chartData.map(item => item[ser.dataKey]);
                    }
                    if (data.length < 1) {
                        return;
                    } else {
                        this.series.push({
                            name: ser.label || ser.dataKey || undefined,
                            data: data,
                            color: ser.color || undefined
                        });
                    }
                });
                if (this.series.length < 1) {
                    this.options.noData.text = "No data available!";
                    this.options.noData.style.color = "rgb(255,0,0)";
                }
            }
            if (this.xAxis && this.xAxis.data && this.xAxis.data.length) {
                this.options.xaxis["categories"] = this.xAxis.data;
            } else if (
                this.xAxis &&
                this.xAxis.dataKey &&
                this.chartData.length &&
                this.xAxis.dataKey in this.chartData[0]
            ) {
                this.options.xaxis["categories"] = this.chartData.map(item => item[this.xAxis.dataKey]);
            }
        },
        createGradient(obj) {
            const { color1, color2, opacity1, opacity2, deg } = obj;
            return {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "vertical",
                    shadeIntensity: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: color1,
                            opacity: opacity1
                        },
                        {
                            offset: 100,
                            color: color2,
                            opacity: opacity2
                        }
                    ],
                    angle: deg
                }
            };
        }
    },
    watch: {
        title: function(val) {
            if (val) {
                this.options = {
                    ...this.options,
                    title: {
                        text: val.text || val,
                        style: val.style || {}
                    }
                };
            }
        },
        data: function(val) {
            if (val && val.length) {
                this.chartData = val;
                this.series = [];
                this.options = { ...this.options };
                this.populateGraph();
            }
        },
        yAxis: function(val) {
            if (val && val.series && val.series.length) {
                this.options = {
                    ...this.options,
                    yaxis: {
                        title: {
                            text: val.label ? val.label.text || val.label : undefined,
                            style: val.label && val.label.style ? val.label.style : {}
                        },
                        labels: {
                            style: {
                                colors: val.tickColor,
                                fontSize: val.tickSize
                            }
                        }
                    }
                };
                this.series = [];
                this.populateGraph();
            }
        },
        xAxis: function(val) {
            if (val && val.dataKey && val.label) {
                this.options = {
                    ...this.options,
                    xaxis: {
                        title: {
                            text: val.label ? val.label.text || val.label : undefined,
                            style: val.label && val.label.style ? val.label.style : {}
                        },
                        labels: {
                            style: {
                                colors: val.tickColor,
                                fontSize: val.tickSize
                            }
                        }
                    }
                };
                this.series = [];
                this.populateGraph();
            }
        }
    }
};
</script>
