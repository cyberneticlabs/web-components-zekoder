<template>

    <h2 @click="$emit('onClick', $event)" :class="customClass" :style="styleObj" v-if="headingLevel == 2"> {{text}} </h2>
    <h3 @click="$emit('onClick', $event)" :class="customClass" :style="styleObj" v-else-if="headingLevel == 3"> {{text}} </h3>
    <h4 @click="$emit('onClick', $event)" :class="customClass" :style="styleObj" v-else-if="headingLevel == 4"> {{text}} </h4>
    <h5 @click="$emit('onClick', $event)" :class="customClass" :style="styleObj" v-else-if="headingLevel == 5"> {{text}} </h5>
    <h6 @click="$emit('onClick', $event)" :class="customClass" :style="styleObj" v-else-if="headingLevel == 6"> {{text}} </h6>
    <h1 @click="$emit('onClick', $event)" :class="customClass" :style="styleObj" v-else> {{text}} </h1>

</template>

<script>

  export default {
    name: 'ZekHeading',
    props: {
        text: {
            type: String,
            default: ""
        },
        headingLevel: {
            type: [String, Number],
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ""
        },
        id: {
            type: [String, Number],
            default: ""
        },
    },
    data() {
        return {}
    },
    created() {
    }
  }
</script>

<style lang="scss"></style>
