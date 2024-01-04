<template>
  <div ref="zekProgressBar" class="zek-progress-bar" :class="customClass" :style="styleObj">
    <span v-if="label" :style="label.style">{{ label.text | label }}</span>
    <b-progress
      :value="value"
      :max="max"
      :height="height"
      :show-value="showValue"
      v-bind="extraProps"
      v-on="extraEvents"
    >
      <b-progress-bar v-if="customBar" :value="value">
        <span :class="customBar.class"> {{ customBar.text }} </span>
        <component
          v-if="customBar.component"
          :class="customBar.class"
          :is="customBar.component"
          v-bind="customBar.props"
          v-on="customBar.events"
        />
      </b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
export default {
    name: 'ZekProgressBar',
    props: {
        backgroundColor: {
            type: String,
            default: 'blue',
        },
        showValue: {
            type: Boolean,
            default: true,
        },
        value: {
            type: [Number, String] ,
            default: "",
            required: true,
        },
        max: {
            type: [Number, String],
            default: "",
            required: true,
        },
        height: {
            type: String,
            default: '1rem',
        },
        label: {
            type: Object,
            required: false,
            default: () => ({})
        },
        customBar: {
            type: Object,
            required: false,
            default: () => ({})
        },
        customClass: {
            type: String,
            required: false,
            default: ''
        },
        extraProps: {
            type: Object,
            default: () => ({}),
            required: false,
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        },
          styleObj: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
};
</script>

<style scoped>
::v-deep [role=progressbar]{
    background-color: v-bind(backgroundColor);
}
</style>
