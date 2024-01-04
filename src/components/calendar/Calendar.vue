<template>
<div @click="$emit('onClick', $event)">
    <b-calendar
        v-if="theme.toLowerCase() == 'bootstrap'"
        :min="min"
        :max="max"
        v-model="value"
        :class="customClass"
        :style="styleObj"
        :disabled="disabled"
        :readonly="readonly"
        :date-disabled-fn="disabledDatesBS"
        v-bind="extraProps"
        v-on="extraEvents"
        ref="zekCalendar"
    />
    <v-date-picker
        v-else
        :min="min"
        :max="max"
        :multiple="multiple"
        :type="type"
        v-model="value"
        :class="customClass"
        :style="styleObj"
        :disabled="disabled"
        :readonly="readonly"
        :allowed-dates="disabledDatesMUI"
        :color="color"
        @input="onChange"
        v-bind="extraProps"
        v-on="extraEvents"
        ref="zekCalendar"
    />
</div>
</template>

<script>
export default {
    name: "ZekCalendar",
    props: {
        id: {
            type: String,
            default: ""
        },
         styleObj: {
            type: Object,
            default: () => ({})
        },
        color: {
            type: String,
            default: ""
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: "date"
        },
        theme: {
            type: String,
            default: "material"
        },
        initialValue: {
            type: String,
            default: new Date().toISOString().substr(0, 10)
        },
        multiple: {
            type: Boolean,
            default: false
        },
        min: {
            type: String,
            default: ""
        },
        max: {
            type: String,
            default: ""
        },
        customClass: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabledDates: {
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
            value: this.initialValue ?? "",
            checkHeader: this.showHeader ? "" : "none",
            toBeDisabled: []
        };
    },
    mounted() {
        this.processDisabledDates();
    },
    watch: {
        disabledDates() {
            this.processDisabledDates();
        }
    },
    methods: {
        processDisabledDates() {
            const makeDate = d => new Date(d).toISOString().substr(0, 10);
            if (this.disabledDates) {
                if (this.disabledDates.dates) {
                    //? Array of dates
                    this.toBeDisabled = this.disabledDates.dates;
                } else if (this.disabledDates.from && this.disabledDates.to) {
                    //? Date range
                    while (this.disabledDates.from <= this.disabledDates.to) {
                        this.toBeDisabled.push(this.disabledDates.from);
                        this.disabledDates.from.setDate(this.disabledDates.from.getDate() + 1);
                    }
                } else if (this.disabledDates.ranges) {
                    //? Multiple date ranges
                    this.disabledDates.ranges.forEach(range => {
                        while (range.from <= range.to) {
                            this.toBeDisabled.push(makeDate(range.start));
                            range.start.setDate(range.start.getDate() + 1);
                        }
                    });
                }
            }
            this.toBeDisabled = this.toBeDisabled.map(d => makeDate(d));
        },
        disabledDatesBS(ymd, date) {
            return this.toBeDisabled.includes(ymd);
        },
        disabledDatesMUI(date) {
            return !this.toBeDisabled.includes(date);
        },
        onChange() {
            this.$emit("onChange", this.value);
        }
    }
};
</script>

<style scoped>
::v-deep .b-calendar-header {
    display: v-bind(checkHeader);
}
::v-deep .v-picker__title {
    display: v-bind(checkHeader);
}
</style>
