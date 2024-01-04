<template>
    <div :class="customClass" :style="styleObj">
        <chart
            type="treemap"
            :options="options"
            :series="series"
            :width="width"
            :height="height"
            v-on="extraEvents"
            v-bind="extraProps"
            ref="zekTreemapChart"
        ></chart>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import * as axios from "axios";
export default {
    name: "ZekTreemapChart",
    components: {
        chart: VueApexCharts
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
        chartOptions: {
            // object to overwrite any of the chart option, or to add a new option.
            type: Object,
            default: () => {
                return {};
            }
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
                series: [],
                chart: {
                    id: `treemap-chart-${this.id}`,
                    events: {
                        dataPointSelection: (event, chartContext, config) => {
                            this.$emit("dataPointSelection", config);
                        }
                    }
                },
                noData: {
                    text: "Loading...",
                    style: {
                        color: undefined,
                        fontSize: "20px"
                    }
                },
                plotOptions: {
                    treemap: {
                        distributed: true,
                        enableShades: false
                    }
                },
                colors: [],
                title: {
                    text: this.title ? this.title.text || this.title : undefined,
                    style: this.title && this.title.style ? this.title.style : {}
                },
                ...this.chartOptions
            }
        };
    },
    created() {
        //chart settings

        //chart data
        if (this.data && this.data.length) {
            this.chartData = this.data;
            this.populateGraph();
        } else if (this.apiInfo && this.apiInfo.url) {
            this.fetchData();
        } else {
            this.populateGraph();
        }
        console.log(this.series);
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
            if (this.chartData && this.chartData.length) {
                this.series[0] = { data: [] };
                this.options.series[0] = { data: [] };
                this.chartData.forEach(ser => {
                    let data = [];
                    if (ser.data) {
                        data = { x: ser.label, y: ser.data };
                    } else if (ser.dataKey && this.chartData.length && ser.dataKey in this.chartData[0]) {
                        data = this.chartData.map(item => item[ser.dataKey]);
                    }

                    if (data.length < 1) {
                        return;
                    } else {
                        this.series[0].data.push(data);
                        this.options.colors.push(ser.color || undefined);
                    }
                });
                console.log(this.series);
                if (this.series.length < 1) {
                    this.options.noData.text = "No data available!";
                    this.options.noData.style.color = "rgb(255,0,0)";
                }
            }
        }
    },
    watch: {
        data: function(val) {
            if (val && val.length) {
                this.chartData = val;
                this.series = [];
                this.options = { ...this.options, labels: [], colors: [] };
                this.populateGraph();
            }
        }
    }
};
</script>
