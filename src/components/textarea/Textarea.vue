<template>
    <div
        style="position: relative"
        :style="styleObject"
        :class="error ? 'zek-invalid-field' : customClass ? customClass + '-container' : 'zek-textarea-container'"
        @click="$emit('onClick', $event)"
        ref="zekTextarea"
    >
        <span v-if="label" :style="label.style">
            <span v-html="label.html || label.text || label"></span>
            <span class="required-asterik" v-if="required">*</span>
            <i
                class="input-hint-icon far fa-circle-question"
                v-if="hint"
                v-b-tooltip.hover.top
                :title="hint"
                @click="hintClicked"
            />
        </span>
        <textarea
            :class="customClass"
            :name="name"
            :id="id"
            ref="textarea"
            :placeholder="placeholder"
            :readonly="readonly"
            :required="required"
            :disabled="disabled"
            :minlength="minMaxValue ? minMaxValue.min : null"
            :maxlength="minMaxValue ? minMaxValue.max : null"
            :rows="rows"
            @change="onChange"
            @input="onInput"
            @keydown.enter.exact.prevent="onEnter"
            :form="form"
            :value="value"
            :style="inputStyle"
        />
        <span v-if="showLimitIndicator" class="limit" :style="limitIndicatorStyle">
            {{ value.length }}/{{ minMaxValue.max }}
        </span>
        <div class="field-error" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
export default {
    name: "ZekTextarea",
    props: {
        autoResize: {
            type: Boolean,
            default: false
        },
        maxHeight: {
            type: String,
            default: "100px"
        },
        rows: {
            type: Number,
            default: 3
        },
        hint: String,
        inputStyle: {
            type: Object,
            default: () => {}
        },
        label: {
            type: [Object, String],
            default: ""
        },
        customClass: {
            type: String,
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showLimitIndicator: {
            type: Boolean,
            default: false
        },
        initialValue: {
            type: String,
            default: ""
        },
        minMaxValue: {
            type: Object,
            default: () => ({
                min: "",
                max: ""
            })
        },
        styleObject: {
            type: Object,
            default: () => ({})
        },
        name: {
            type: String,
            default: ""
        },
        id: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        readonly: {
            type: Boolean,
            default: false
        },
        form: {
            type: String,
            default: ""
        },
        error: {
            type: String,
            default: ""
        },
        limitIndicatorStyle: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            value: this.initialValue || ""
        };
    },
    methods: {
        onInput(event) {
            if (this.autoResize) {
                this.$refs.textarea.style.overflow = "auto";
                this.$refs.textarea.style.height = "auto";
                this.$refs.textarea.style.maxHeight = this.maxHeight;
                this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 2 + "px";
            }
            this.value = event.target.value;
            this.$emit("onInput", { id: this.id, value: this.value });
        },
        onChange(event) {
            // ! this is only for possible previous use cases should be changed
            this.$emit("onChange", event.target.value);
        },
        onEnter(event) {
            // ! this is only for possible previous use cases should be changed
            this.$emit("onEnter", event.target.value);
        }
    },
    watch: {
        initialValue(newValue) {
            this.value = newValue;
            this.$emit("onInput", { id: this.id, value: this.value });
        }
    }
};
</script>

<style scoped lang="scss">
.required-asterik {
    color: red;
}
.field-error {
    font-size: 12px;
    color: #dc3545;
}
textarea {
    resize: none;
}
.input-hint-icon {
    color: #999;
    cursor: pointer;
    height: 100%;
}
</style>
