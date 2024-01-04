<template>
  <div
      @click="$emit('onClick', $event)"
      :class="error ? 'zek-invalid-field' : customClass ? customClass + '-container' : 'input-field-container'"
      :style="styleObject"
      ref="zekInput"
  >
      <i
          v-if="icon && iconSettings.position == 'left'"
          :class="icon"
          @click.prevent="iconClicked"
          :style="{
              ...iconSettings.style,
              cursor: iconSettings.clickable ? 'pointer' : 'default'
          }"
      />
      <span v-if="label" class="input-label" :style="label.style">
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
      <b-form-datepicker
          v-if="inputType === 'datepicker'"
          v-model="value"
          v-bind="$props"
          v-on="extraEvents"
          :min="minMaxValue.min"
          :max="minMaxValue.max"
          :class="customClass"
          :button-only="false"
          @input="onInput"
      ></b-form-datepicker>
      <input
          v-else
          v-model="value"
          :value="assignedValue || undefined"
          :class="customClass"
          :type="actualType"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :readonly="readonly"
          :required="required"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :minlength="actualType != 'number' ? minMaxValue.min : null"
          :maxlength="actualType != 'number' ? minMaxValue.max : null"
          :min="actualType == 'number' ? minMaxValue.min : null"
          :max="actualType == 'number' ? minMaxValue.max : null"
          :pattern="pattern ? pattern : null"
          :title="title"
          :style="inputStyle"
          v-on="preventSpaces ? { keypress: preventSpaceKey } : {}"
          v-bind="extraProps"
          @keyup="onKeyUp"
          @change="onInput"
          @input="input"
      />
      <i
          v-if="showPasswordButton && showPasswordButton == 'icon'"
          :class="actualType == 'password' ? 'fa fa-eye' : 'fa fa-eye-slash'"
          @click.prevent="actualType == 'password' ? (actualType = 'text') : (actualType = 'password')"
          :style="{
              ...iconSettings.style,
              cursor: 'pointer'
          }"
      />
      <a
          v-else-if="showPasswordButton"
          class="show-hide-password"
          href="javascript:"
          @click="actualType == 'password' ? (actualType = 'text') : (actualType = 'password')"
          >{{ actualType == "password" ? "show" : "hide" }}</a
      >
      <i
          v-if="icon && iconSettings.position == 'right'"
          :class="icon"
          @click.prevent="iconClicked"
          :style="{
              ...iconSettings.style,
              cursor: iconSettings.clickable ? 'pointer' : 'default'
          }"
      />
      <div class="field-error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
    name: "ZekInput",
    props: {
        type: {
            type: String,
            default: "short-text"
        },
        inputType: {
            type: String,
            default: "text"
        },
        label: {
            type: [Object, String]
        },
        customClass: {
            type: String,
            default: ""
        },
        inputStyle: {
            type: Object
        },
        required: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        },
        iconSettings: {
            type: Object,
            default: () => ({
                position: "left",
                clickable: false,
                style: {
                    margin: "0 0.5rem"
                }
            })
        },
        showPasswordButton: {
            type: String,
            default: ""
        },
        pattern: {
            type: String,
            default: ""
        },
        initialValue: {
            type: [String, Number, Boolean],
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
            default: () => ({
                position: "relative"
            })
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
        autocomplete: {
            type: String,
            default: "on"
        },
        extraProps: {
            type: Object,
            default: () => ({})
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        },
        title: {
            type: String,
            default: ""
        },
        preventSpaces: {
            type: Boolean,
            default: false
        },
        assignedValue: {
            type: String,
            default: ""
        },
        hint: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            actualType: this.inputType,
            value: this.initialValue || ""
        };
    },
    methods: {
        input(event) {
            this.$emit("input", { id: this.id, value: this.value });
        },
        onInput(event) {
            this.$emit("onInput", this.inputType === "datepicker" ? { target: { value: event } } : event);
        },
        preventSpaceKey(event) {
            if (event.keyCode == 32) {
                event.preventDefault();
            }
        },
        onKeyUp(event) {
            this.$emit("onKeyUp", event);
        },
        iconClicked(event) {
            this.iconSettings.clickable ? this.$emit("iconClicked", event) : "";
        },
        hintClicked(event) {
        this.$emit("hintClicked", event);
        }
    },
    watch: {
        initialValue(val) {
            this.value = val;
        }
    }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.show-hide-password {
  text-transform: uppercase;
  position: absolute;
  right: 0;
  font-size: 12px;
  line-height: 50px;
}
.required-asterik {
  color: red;
}

.input-hint-icon {
  color: #999;
  cursor: pointer;
  height: 100%;
}

.field-error {
  font-size: 12px;
  color: #dc3545;
}
.zek-invalid-field > input {
  border: solid 2px #dc354550;
}
</style>
