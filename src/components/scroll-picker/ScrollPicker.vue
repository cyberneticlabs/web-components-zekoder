<template>
    <div ref="zekScrollPicker" style="display:flex" :style="styleObject">
        <ScrollPicker
            v-if="type.includes('date')"
            :options="years"
            v-model="value.year"
            @input="onChange"
            :class="`zek-scroll-picker ${customClass} years`"
        />
        <ScrollPicker
            v-if="type.includes('date')"
            style="pointer-events:none; width: 5px"
            :placeholder="dateSplitter"
        />
        <ScrollPicker
            v-if="type.includes('date')"
            :options="months"
            v-model="value.month"
            @input="onChange"
            :class="`zek-scroll-picker ${customClass} months`"
        />
        <ScrollPicker
            v-if="type.includes('date')"
            style="pointer-events:none; width: 5px"
            :placeholder="dateSplitter"
        />
        <ScrollPicker
            v-if="type.includes('date')"
            :options="days"
            v-model="value.day"
            @input="onChange"
            :class="`zek-scroll-picker ${customClass} days`"
        />
        <ScrollPicker
            v-if="type.includes('time')"
            :options="hours"
            v-model="value.hour"
            @input="onChange"
            :class="`zek-scroll-picker ${customClass} hours`"
        />
        <ScrollPicker style="pointer-events:none; width: 5px" :placeholder="timeSplitter" />
        <ScrollPicker
            v-if="type.includes('time')"
            :options="minutes"
            v-model="value.minutes"
            @input="onChange"
            :class="`zek-scroll-picker ${customClass} minutes`"
        />
        <ScrollPicker
            v-if="type.includes('time') && !H24"
            :options="[
                { name: 'AM', value: true },
                { name: 'PM', value: false }
            ]"
            @input="onChange"
            :class="`zek-scroll-picker ${customClass} am_pm`"
        />
        <ScrollPicker v-if="type == 'custom'" v-bind="customPicker" v-on="customEvents" />
    </div>
</template>

<script>
import "./style.css";
import { ScrollPicker } from "vue-scroll-picker";

export default {
    name: "ZekScrollPicker",
    components: {
        ScrollPicker
    },
    props: {
        activeColor: {
            type: String,
            default: "blue"
        },
        type: {
            type: String, // date, time, datetime, custom
            default: "datatime"
        },
        customClass: {
            type: String,
            default: ""
        },
        monthFormat: {
            type: String, // short, long, number
            default: "short"
        },
        minDate: {
            type: String,
            required: false,
            default: "2022-02-01 00:00"
        },
        maxDate: {
            type: String,
            required: false,
            default: "2100-01-01 00:00"
        },
        height: {
            type: String,
            default: "1em"
        },
        width: {
            type: String,
            default: "1em"
        },
        initialValue: {
            type: String,
            default: ""
        },
        styleObject: {
            type: Object,
            required: false,
            default: () => ({})
        },
        H24: {
            type: Boolean,
            default: false
        },
        customPicker: {
            type: Object,
            required: false
        },
        customEvents: {
            type: Object,
            required: false
        },
        dateSplitter: {
            type: String,
            default: "-"
        },
        timeSplitter: {
            type: String,
            default: ":"
        },
        margin: {
            type: String,
        },
        fontSize: {
            type: String,
        },
        border: {
            type: String,
            default: "1px solid #ccc"
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            value: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate(),
                hour: this.H24 ? new Date().getHours() : new Date().getHours() % 12,
                minutes: new Date().getMinutes()
            },
            minutes: new Array(60).fill(0).map((_, i) => {
                return { name: i  < 10 ? `0${i}` : `${i}`, value: i < 10 ? `0${i}` : `${i}` };
            }),
        };
    },
    created() {
        if (this.initialValue) {
            const date = new Date(this.initialValue);
            this.value.year = `${date.getFullYear()}`;
            this.value.month = `${date.getMonth() + 1}`;
            this.value.day = `${date.getDate()}`;
            this.value.hour = `${date.getHours()}`;
            this.value.minutes = `${date.getMinutes()}`;
        }
    },
    methods: {
        onChange() {
            const { year, month, day, hour, minutes } = this.value;
            this.$emit("onChange", {
                dateString: `${year}-${month}-${day} ${hour}:${minutes} ${this.H24 ? "AM" : "PM"}`,
                time: `${hour}:${minutes} ${this.H24 ? "AM" : "PM"}`,
                date: new Date(year, month, day, hour, minutes),
                value: this.value
            });
        }
    },
    computed: {
        years() {
            const min = new Date(this.minDate);
            const max = new Date(this.maxDate);
            const years = [];
            for (let i = min.getFullYear(); i <= max.getFullYear(); i++) {
                years.push(i);
            }
            return years;
        },
        months() {
            const months = new Array(12).fill(0).map((_, i) => i);
            if (this.monthFormat === "short") {
                return months.map(month => {
                    const date = new Date(2021, month, 1);
                    return { name: date.toLocaleString("default", { month: "short" }), value: month + 1 };
                });
            } else if (this.monthFormat === "long") {
                return months.map(month => {
                    const date = new Date(2021, month, 1);
                    return { name: date.toLocaleString("default", { month: "short" }), value: month + 1 };
                });
            } else return new Array(12).fill(0).map((_, i) => i + 1);
        },
        days() {
            const { year, month } = this.value;
            const days = new Date(year, month, 0).getDate();
            return new Array(days).fill(0).map((_, i) => i + 1);
        },
        hours() {
            if (this.H24) {
                return new Array(24).fill(0).map((_, i) => {
                    return { name: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`, value: i + 1 };
                });
            } else {
                return new Array(12).fill(0).map((_, i) => {
                    return { name: i + 1 < 10 ? `0${i + 1}` : `${i + 1}`, value: i + 1 };
                });
            }
        }
    }
};
</script>

<style scoped>
.vue-scroll-picker {
    max-height: v-bind(height);
    width: v-bind(width);
}
:deep .top {
    border-bottom: v-bind(border);
}
:deep .bottom {
    border-top: v-bind(border);
}
:deep .-selected {
    color: v-bind(activeColor);
    margin: v-bind(margin);
    font-size: v-bind(fontSize);
}
</style>
