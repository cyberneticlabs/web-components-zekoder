<template>
    <v-app>
        <div ref="zekScheduler" class="zek-scheduler" :style="{ height: height, width: width, ...styleObject }" @click="$emit('onClick', $event)">
            <v-toolbar v-if="showToolbar" flat :class="toolbarClass">
                <v-toolbar-title class="toolbar-title pr-4">
                    {{ title }}
                </v-toolbar-title>
                <v-btn outlined class="today-btn mr-4" color="grey darken-2" @click="setToday">
                    Today
                </v-btn>
                <v-menu bottom right>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                            <span>{{ typeToLabel[type] }}</span>
                            <v-icon right>
                                mdi-menu-down
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item @click="type = 'day'">
                            <v-list-item-title>Day</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'week'">
                            <v-list-item-title>Week</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = 'month'">
                            <v-list-item-title>Month</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="type = '4day'">
                            <v-list-item-title>4 days</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-btn fab text small class="left-arrow-button" color="grey darken-2" @click="$refs.calendar.prev()">
                    <v-icon small>
                        mdi-chevron-left
                    </v-icon>
                </v-btn>
                <v-btn fab text small class="right-arrow-button" color="grey darken-2" @click="$refs.calendar.next()">
                    <v-icon small>
                        mdi-chevron-right
                    </v-icon>
                </v-btn>
            </v-toolbar>
            <v-calendar
                ref="calendar"
                :class="customClass"
                v-model="value"
                :weekdays="weekdays"
                :type="type"
                :events="events"
                :event-overlap-mode="mode"
                :event-more="true"
                @click:event="showEvent"
                @click:more="viewDay"
                @click:date="viewDay"
                v-bind="extraProps"
                v-on="extraEvents"
            />
            <slot :name="targetContainer" :events="events"/>
        </div>
    </v-app>
</template>

<script>
export default {
    name: "ZekScheduler",
    props: {
        height: {
            type: String,
            default: "700px"
        },
        width: {
            type: String,
            default: "100%"
        },
        customClass: {
            type: String,
            default: "zek-scheduler"
        },
        type: {
            type: String,
            default: "month"
        },
        weekdays: {
            type: Array,
            default: () => [1, 2, 3, 4, 5, 6, 0]
        },
        events: {
            type: Array,
            default: () => []
        },
        eventOverlapThreshold: {
            type: Number,
            default: 5
        },
        mode: {
            type: String,
            default: "stack"
        },
        styleObject: {
            type: Object,
            default: () => ({})
        },
        focus: {
            type: String,
            default: new Date().toISOString().substr(0, 10)
        },
        toolbarClass: {
            type: String,
            default: ""
        },
        showToolbar: {
            type: Boolean,
            default: true
        },
        targetContainer: {
            type: String,
            default: ""
        },
        extraProps: {
            type: Object,
            default: () => ({})
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        },
    },
    mounted() {
        this.$refs.calendar.checkChange();
        this.title = this.$refs.calendar.title;
    },
    data() {
        return {
            value: "",
            title: "",
            typeToLabel: {
                month: "Month",
                week: "Week",
                day: "Day",
                "4day": "4 Days"
            }
        };
    },
    methods: {
        showEvent({ nativeEvent, event }) {
            this.$emit("showEvent", { nativeEvent, event });
        },
        viewDay(event, nativeEvent) {
            const getDateOnly = date => new Date(date).toLocaleDateString();
            const dayEvents = this.events.filter(
                e => getDateOnly(e.start) === getDateOnly(event.date) || getDateOnly(e.end) === getDateOnly(event.date)
            );

            this.$emit("viewDay", { dayEvents, nativeEvent, event });
        },
        setToday() {
            this.value = new Date().toISOString().substr(0, 10);
        }
    }
};
</script>

<style scoped>
:deep .v-application--wrap{
  min-height: fit-content !important;
}
</style>
