<template>
    <div :class="customClass" :style="styleObj">
        <chart
            type="radialBar"
            :options="options"
            :series="series"
            :width="width"
            :height="height"
            v-on="extraEvents"
            v-bind="extraProps"
            ref="zekRadialChart"
        ></chart>
    </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
import * as axios from "axios";
export default {
    name: "ZekRadialChart",
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
        colors: {
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
        showLegend: {
            type: Boolean,
            default: true
        },
        stroke: {
            // https://apexcharts.com/docs/options/stroke/ (curve, lineCap, width)
            type: Object,
            default: () => ({})
        },
        size: {
            type: String,
            default: ""
        },
        labels: {
            type: Object,
            default: () => ({})
        },
        hollow: {
            // https://apexcharts.com/docs/options/plotoptions/radialbar/ (size, margin, background, image, imageWidth, imageHeight, imageClipped, imageOffsetX, imageOffsetY, position, dropShadow)
            type: Object,
            default: () => ({})
        },
        track: {
            // https://apexcharts.com/docs/options/plotoptions/radialbar/ (background, strokeWidth, margin, dropShadow)
            type: Object,
            default: () => ({})
        },
        fontSize: {
            type: String,
            default: ""
        },
        fontStyle: {
            // https://apexcharts.com/docs/options/dataLabels/value/ (fontSize, fontFamily, fontWeight, color, offsetX, offsetY, formatter, textAnchor, dropShadow)
            type: Object,
            default: () => ({})
        },
        nameText: {
            type: Object,
            default: () => ({})
        },
        totalText: {
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
                labels: [],
                stroke: {
                    curve: "smooth",
                    lineCap: "round",
                    width: 1,
                    ...this.stroke
                },
                chart: {
                    id: `radial-chart-${this.id}`,
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
                title: {
                    text: this.title ? this.title.text || this.title : undefined,
                    style: this.title && this.title.style ? this.title.style : {}
                },
                colors: [],
                legend: {
                    show: this.showLegend
                },
                plotOptions: {
                    radialBar: {
                        hollow: {
                            size: this.size || "70%",
                            ...this.hollow
                        },
                        track: {
                            background: "#e7e7e7",
                            strokeWidth: "67%",
                            margin: 5, // margin is in pixels
                            ...this.track
                        },
                        dataLabels: {
                            show: true,
                            name: {
                                show: false,
                                fontSize: "16px",
                                fontFamily: undefined,
                                fontWeight: 600,
                                color: undefined,
                                offsetY: -10,
                                ...this.nameText
                            },
                            value: {
                                show: true,
                                fontSize: this.fontSize || "100%",
                                offsetY: 5,
                                fontFamily: undefined,
                                fontWeight: 400,
                                color: undefined,
                                ...this.fontStyle
                            },
                            total: {
                                show: false,
                                label: "Total",
                                color: "#373d3f",
                                fontSize: "16px",
                                fontFamily: undefined,
                                fontWeight: 600,
                                ...this.totalText
                            },
                            ...this.labels
                        }
                    }
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
                this.chartData.forEach(ser => {
                    let data = [];
                    if (ser.data) {
                        data = ser.data;
                    } else if (ser.dataKey && this.chartData.length && ser.dataKey in this.chartData[0]) {
                        data = this.chartData.map(item => item[ser.dataKey]);
                    }

                    if (data.length < 1) {
                        return;
                    } else {
                        this.options.labels.push(ser.label || ser.dataKey || undefined);
                        this.options.colors.push(ser.color || undefined);
                        this.options.fill = ser.gradient ? this.createGradient(ser.gradient) : {};
                        this.series.push(data);
                    }
                });
                if (this.series.length < 1) {
                    this.options.noData.text = "No data available!";
                    this.options.noData.style.color = "rgb(255,0,0)";
                }
            }
        },
        // Function to create Apex gradient from css gradient
        createGradient(obj) {
            const { color1, color2, opacity1, opacity2, deg } = obj;
            return {
                type: "gradient",
                gradient: {
                    shade: "light",
                    type: "veritcal",
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
        data: {
            handler(val) {
                this.chartData = val;
                this.series = [];
                this.options = { labels: [], colors: [], ...this.options };
                this.populateGraph();
            },
            deep: true
        }
    }
};
</script>
