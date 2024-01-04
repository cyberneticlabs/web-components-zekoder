<template>
    <div ref="zekForm" :style="styleObj" :class="customClass" @click="$emit('onClick', $event)">
        <zek-heading v-if="heading" v-bind="headingProps"></zek-heading>
        <zek-heading v-if="subheading" v-bind="subheadingProps"></zek-heading>
        <zek-text v-if="description" v-bind="descProps"></zek-text>
        <form @submit.prevent="submitForm" @reset="cancelForm" action="/" method :key="formKey">
            <div class="form-group">
                <zek-column-content :column="content()" />
                <div v-if="forgotPassword" class="forgot-link" :class="forgotPassword.class">
                    <RouterLink :to="forgotPassword.url || '/auth/forgotpassword'">
                        <span v-html="forgotPassword.label || 'Forgot Password?'"></span>
                    </RouterLink>
                </div>
                <div v-if="rememberMe" class="remember-me" :class="rememberMe.class">
                    <ZekInput
                        class="remember-input"
                        :inputType="'checkbox'"
                        :checked="rememberMe.checked"
                        :inputStyle="rememberMe.inputStyle || { width: '18px', height: '18px' }"
                        :label="
                            rememberMe.label || {
                                text: 'Remember me',
                                style: {
                                    fontSize: 'initial',
                                    paddingLeft: '5px'
                                }
                            }
                        "
                        @onInput="$emit('rememberMeUpdated', $event.target.checked)"
                    ></ZekInput>
                </div>
                <div v-if="showTerms" class="terms-conditions">
                    <ZekInput
                        class="terms-input"
                        :inputType="'checkbox'"
                        :required="true"
                        :inputStyle="{ width: '18px', height: '18px' }"
                        :label="{
                            text: 'Accept terms and conditions',
                            style: {
                                fontSize: 'initial',
                                paddingLeft: '5px'
                            }
                        }"
                    ></ZekInput>
                </div>
            </div>
            <zek-text v-if="successMessage" :text="successMessage" class="text-success"></zek-text>
            <zek-text
                v-if="errorMessage || internalError"
                :text="internalError || errorMessage"
                class="text-danger login-error-message"
            ></zek-text>
            <div class="align-items-center justify-content-center d-flex">
                <zek-button v-if="cancelProps.show" v-bind="cancelProps" @onClick="cancelForm()"></zek-button>
                <zek-button v-if="submitProps.show" v-bind="submitProps"></zek-button>
            </div>
        </form>
    </div>
</template>
<script>
import ZekButton from "../action-button/ActionButton.vue";
import ZekHeading from "../heading-block/HeadingBlock.vue";
import ZekText from "../text-block/TextBlock.vue";
import ZekInput from "../input-field/InputField.vue";
export default {
    components: {
        ZekButton,
        ZekHeading,
        ZekText,
        ZekInput
    },
    name: "ZekForm",
    props: {
        heading: {
            //for object it should be {text:String, headingLevel:Number, styleObj:Object}
            type: [String, Object],
            default: ""
        },
        subheading: {
            type: [String, Object],
            default: ""
        },
        description: {
            //for object {text: String, lineBreaks: Number, styleObj: Object}
            type: [String, Object],
            default: ""
        },
        inputs: {
            type: Array, //array of objects
            required: true
        },
        submitButton: {
            //for string it is button label, for object it should be {show:true, label:'Submit', styleObj: {}}
            type: [String, Object],
            default: ""
        },
        cancelButton: {
            type: [String, Object],
            default: ""
        },
        theme: {
            type: String,
            default: ""
        },
        successMessage: {
            type: String,
            default: ""
        },
        errorMessage: {
            type: String,
            default: ""
        },
        forgotPassword: {
            type: [Boolean, Object],
            default: false
        },
        rememberMe: {
            type: [Boolean, Object],
            default: false
        },
        showTerms: {
            type: Boolean,
            default: false
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
        }
    },
    beforeCreate() {
        this.$options.components.ZekColumnContent = require("../column-content/ColumnContent.vue").default;
    },
    computed: {
        headingProps() {
            return typeof this.heading == "string" ? { text: this.heading, headingLevel: 1 } : this.heading;
        },
        subheadingProps() {
            return typeof this.subheading == "string" ? { text: this.subheading, headingLevel: 3 } : this.subheading;
        },
        descProps() {
            return typeof this.description == "string" ? { text: this.description } : this.subheading;
        },
        cancelProps() {
            let props = {
                theme: this.theme,
                buttonType: "button",
                label: "Cancel",
                show: true
            };
            if (typeof this.cancelButton == "string") {
                props = {
                    ...props,
                    label: this.cancelButton,
                    show: this.cancelButton
                };
            } else {
                props = {
                    ...props,
                    ...this.cancelButton
                };
            }
            return props;
        },
        submitProps() {
            let props = {
                theme: this.theme,
                buttonType: "submit",
                label: "Submit",
                show: true
            };
            if (typeof this.submitButton == "string") {
                props = {
                    ...props,
                    label: this.submitButton,
                    show: this.submitButton
                };
            } else {
                props = {
                    ...props,
                    ...this.submitButton
                };
            }
            return props;
        },
        formData: {
            get() {
                let obj = {};
                this.inputs.forEach(
                    (input) => {
                        if (input.type !== 'line' && input.type !== 'label') {
                            obj[input.name] = input.initialValue || input.value || (input.inputType === 'checkbox' ? false : '');
                        }
                    }
                )
                return {...obj}
            },
            set(newVal) {}
        },
        defaultData() {
            let obj = {};
            this.inputs.forEach(
                (input) => {
                    if (input.type !== 'line' && input.type !== 'label') {
                        obj[input.name] = input.initialValue || input.value || (input.inputType === 'checkbox' ? false : '');
                    }
                }
            )
            return {...obj}
        },
    },
    data() {
        const inputTypes = {
            'long-text': 'textarea',
            'captcha': 'captcha',
            'radio': 'radio-button',
            'toggle-button': 'toggle-button',
            'dropdown': 'dropdown',
            'countries-list': 'countries-list',
            'file-upload': 'file-upload',
            'label': 'label',
            'line': 'line',
        }
        return {
            content: () => {
                let columns = [];
                this.inputs.forEach(input => {
                    if (input.type == "captcha") {
                        this.containsCaptcha = true;
                    }
                    if(input.type == 'label') {
                        columns.push({
                            columnWidth: input.columnWidth || 12,
                            content: {
                                component: 'text',
                                data: input || {text: "label"},
                            }
                        })
                    }
                    if(input.type == 'line') {
                        columns.push({
                            columnWidth: input.columnWidth || 12,
                            content: {
                                component: 'html',
                                data: input ||  {content: `<hr>`, styleObj: { color: "#000000"}},
                            }
                        })
                    }
                    columns.push({
                        columnWidth: input.columnWidth || 12,
                        content: {
                            component: inputTypes[input.type] || "input",
                            data: input.type == "countries-list" ? { dropdownProps: input } : input,
                            events:
                                input.type == "long-text" || input.type == "file-upload"
                                    ? {
                                          onChange: e => {
                                              this.formData[input.name] = e;
                                              this.emitLatestData(input.name);
                                          }
                                      }
                                    : input.type == "captcha"
                                    ? {
                                          onVerify: () => {
                                              this.captchaVerified = true;
                                          },
                                          onExpired: () => {
                                              this.captchaVerified = false;
                                          }
                                      }
                                    : input.type == "dropdown" || input.type == "countries-list"
                                    ? {
                                          onSelect: e => {
                                              this.formData[input.name] =
                                                  input.selectType && input.selectType.toLowerCase() != "single"
                                                      ? e
                                                      : e[0];
                                              this.emitLatestData(input.name);
                                          }
                                      }
                                    : input.type == "toggle-button"
                                    ? {
                                          onToggle: e => {
                                              this.formData[input.name] = e.selected;
                                              this.emitLatestData(input.name);
                                          }
                                      }
                                    : {
                                          onInput: e => {
                                              if (input.inputType === "checkbox") {
                                                  this.formData[input.name] = e.target.checked;
                                              } else if (input.inputType === "radio") {
                                                  this.formData[input.name] = e.value;
                                              } else {
                                                  this.formData[input.name] = e.target.value;
                                              }
                                              this.emitLatestData(input.name);
                                          }
                                      }
                        }
                    });
                    if (input.inputType == "password" && input.showConfirmation) {
                        columns.push({
                            columnWidth: input.columnWidth || 12,
                            content: {
                                component: "input",
                                data: {
                                    ...input,
                                    name: "confirm_password",
                                    id: "confirm-password",
                                    label: input.confirmationLabel || "Confirm Password",
                                    placeholder: "Please confirm your password",
                                    title: "Both passwords should match",
                                    customClass: "confirm-password"
                                },
                                events: {
                                    onInput: e => {
                                        if (e.target.value != this.formData[input.name]) {
                                            e.target.setCustomValidity("Passwords do no match");
                                        } else {
                                            e.target.setCustomValidity("");
                                        }
                                    }
                                }
                            }
                        });
                    }
                });
                return {
                    rows: [
                        {
                            columns: columns
                        }
                    ]
                };
            },
            captchaVerified: false,
            containsCaptcha: false,
            internalError: "",
            formKey: 0
        };
    },
    methods: {
        submitForm() {
            if (this.containsCaptcha && !this.captchaVerified) {
                this.internalError = "Please verify reCaptcha before proceeding";
                return;
            }
            this.internalError = "";
            this.$emit("submit", this.formData);
        },
        emitLatestData(fieldName) {
            this.$emit("update", {
                fieldName,
                data: this.formData
            });
        },
        cancelForm() {
            this.resetForm();
            this.$emit("cancel", this.formData);
        },
        resetForm() {
            this.formData = { ...this.defaultData };
            this.formKey += 1;
        }
    }
};
</script>
<style scoped>
.show-hide-password {
    text-transform: uppercase;
    position: absolute;
    right: 15px;
    font-size: 12px;
    line-height: 50px;
}
.required-asterik {
    color: red;
}
.login-error-message {
    text-align: left;
    padding-top: 10px;
}
.login-error-message:first-letter {
    text-transform: capitalize;
}
.forgot-link {
    width: 100%;
    text-align: right;
    margin-top: 15px;
    font-size: 0.7vw;
}
.remember-me,
.terms-conditions {
    display: flex;
    font-size: 1vw;
}
.remember-input,
.terms-input {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
}
</style>
