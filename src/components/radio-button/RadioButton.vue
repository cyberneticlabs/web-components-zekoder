<template>
    <div @click="$emit('onClick', $event)" :class="customClass" :style="styleObj">
        <zek-text v-if="label" v-bind="labelProps"></zek-text>
        <div v-for="(item,i) in items" :key="item.value" :class="radioClasses">
            <input class="form-check-input" type="radio" :name="name" :id="name+'-'+i" :value="item.value" :checked="item.checked" :disabled="item.disabled" @change="onChange(item)">
            <label class="form-check-label" :for="name+'-'+i">
                {{item.text}}
            </label>
        </div>
    </div>
</template>

<script>
import ZekText from "../text-block/TextBlock.vue";
  export default {
    name: 'ZekRadioButton',
    components: { ZekText },
    props: {
        theme: String, 
        styleObj: Object,
        label: [String,Object], //for object it should be {text:String, styleObj:Object}
        alignment: String, //horizontal or vertical
        items: Array, //array of objects of type: {value:2, text:'xyz', checked:true, disabled:true}
        customClass: String,
        justifyItems: Boolean,
        name: {
            type: String,
            default: 'zekRadios'
        }
    },
    data() {
        return {    
        }
    },
    computed: {
        labelProps() {
            return typeof(this.label)=='string'? {text: this.label} : this.label;
        },
        radioClasses() {

            return 'form-check'+ (this.alignment=='horizontal'? ' form-check-inline' : '') + (this.justifyItems? ' justify':'')
        }
    },
    methods: {
        onChange(item) {
            this.$emit('onInput', item);
        }
    }
  }
</script>

<style scoped lang="scss">

.justify input{
    margin-left: 10px;
    margin-right: 0;
    float: right;
}
.justify label{
    margin-left: 0px;
    margin-right: 0px;
    float: left;
}
div.justify{
    padding-left: 0;
}
</style>