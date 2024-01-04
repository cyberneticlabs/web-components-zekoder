<template>
    <p ref="zekText" @click="$emit('onClick', $event)" :style="styleObj" :class="customClass">
        <span v-if="value"> {{value}} </span>
    </p>

</template>

<script>

  export default {
    name: 'ZekText',
    props: {
        text: {
            type: String,
            default: ""
        },
        lineBreaks: {
            type: Number,
            default: 0
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        dataField: {
            type: String,
            default: ""
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
        return{}
    },
    created() {
        // console.log(this.map)
    },
    computed: {
        value(){
            return this.dataField ? this.dataField : this.text;
        }
    },
  }
</script>

<style lang="scss"></style>
