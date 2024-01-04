<template>
    <div ref="zekGeoHeatmap" :class="customClass" :style="styleObj">
        <h1 :style="title && title.style ? title.style : {}">{{ title ? title.text || title : undefined }}</h1>
        <GeoHeatmap
            v-if="data && series"
            :id="`geo-heatmap-${id}`"
            :style="{ width: width, height: height }"
            :countryData="series"
            v-bind="options"
            v-on="extraEvents"
        />
        <div v-else :style="noData.style">{{ noData.text }}</div>
    </div>
</template>

<script>
import map from "vue-geo-heat-maps";
import * as axios from "axios";
export default {
    name: "ZekGeoHeatmap",
    components: {
        GeoHeatmap: map
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
        options: {
            type: Object,
            default: () => ({})
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
        extraEvents: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            chartData: {},
            series: {},
            noData: {
                text: "Loading...",
                style: {
                    color: undefined,
                    fontSize: "20px",
                    width: this.width,
                    height: this.height,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }
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
                    this.noData.text = "Could not fetch data!";
                    this.noData.style.color = "rgb(255,0,0)";
                });
        },
        populateGraph() {
            if (this.chartData && this.chartData.length) {
                this.chartData.forEach(ser => {
                    let data = {};
                    if (ser.data) {
                        data = { [ser.label]: ser.data };
                    } else if (ser.dataKey && this.chartData.length && ser.dataKey in this.chartData[0]) {
                        data = this.chartData.map(item => item[ser.dataKey]);
                    }

                    if (data.length < 1) {
                        return;
                    } else {
                        this.series = { ...this.series, ...data };
                    }
                });
                if (!this.series) {
                    this.noData.text = "No data available!";
                    this.noData.style.color = "rgb(255,0,0)";
                }
            }
        }
    },
    watch: {
        data: function(val) {
            if (val && val.length) {
                this.chartData = val;
                this.series = [];
                this.populateGraph();
            }
        }
    }
};
</script>
