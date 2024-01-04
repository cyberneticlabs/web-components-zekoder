<template>
    <div ref="zekToggleButton" id="toggle-button-container" :class="customClass" :style="styleObj">
        <span v-if="label" :style="label.style">
            <span v-html="label.html || label.text || label"></span>
            <span class="required-asterik" v-if="required">*</span>
        </span>
        <button
            type="button"
            class="btn zek-toggle-btn"
            data-bs-toggle="button"
            v-for="(btn, i) in toggleButtons"
            :key="i"
            :class="(btn.class || '') + (btn.active ? ' active' : '') + (btn.disabled ? ' disabled' : '')"
            :style="btn.style"
            :disabled="disabled || btn.disabled"
            :id="btn.id"
            :name="btn.name"
            :aria-pressed="btn.active"
            @click="toggleState(btn)"
        >
            <span v-if="btn.label && btn.textPosition && btn.textPosition.toLowerCase() == 'left'">
                {{ btn.label }}
            </span>
            <img v-if="btn.image && btn.image.src" v-bind="btn.image" />
            <i v-else-if="btn.icon" :class="btn.icon.class || btn.icon" :style="btn.icon.style"></i>
            <span v-if="btn.label && !(btn.textPosition && btn.textPosition.toLowerCase() == 'left')">
                {{ btn.label }}
            </span>
        </button>
        <ZekInput
            v-if="showEnableDisableCheckbox"
            class="enable-disable-checkbox"
            :inputType="'checkbox'"
            :initialValue="!disabled"
            :inputStyle="{ width: '20px', height: '20px' }"
            @onInput="onCheckboxChange($event)"
        ></ZekInput>
    </div>
</template>

<script>
import ZekInput from "../input-field/InputField.vue";
export default {
    name: "ZekToggleButton",
    components: { ZekInput },
    props: {
        buttons: {
            // [{class, styleObj, label, icon, active, disabled, name, id, image, textPosition },...]
            type: Array,
            default: () => []
        },
        theme: {
            type: String,
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
        showEnableDisableCheckbox: {
            type: Boolean,
            default: false
        },
        label: {
            type: [String, Object],
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    computed: {
        toggleButtons: {
            get() {
                return [...[], ...this.buttons];
            },
            set() {}
        }
    },
    methods: {
        toggleState(button) {
            button["active"] = !button.active;
            this.buttonToggled(button);
        },
        buttonToggled(button) {
            let selected = [];
            this.toggleButtons.forEach(btn => {
                if (btn.active) {
                    selected.push(btn.name);
                }
            });

            let data = {
                buttonName: button.name,
                active: button.active || false,
                buttons: this.toggleButtons,
                selected
            };
            this.$emit("onToggle", data);
        },
        onCheckboxChange(event) {
            this.disabled = !event.target.checked;
        }
    }
};
</script>

<style lang="scss" scoped>
.enable-disable-checkbox {
    margin-left: 30px;
}
</style>
