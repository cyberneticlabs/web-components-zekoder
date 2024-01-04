<template>
    <div ref="zekGuidedForm" id="guided-form-container" :class="customClass" :style="styleObj">
        <div v-if="currentStep" class="row question">
            <div class="col">
                <div class="row design">
                    <div class="col">
                        <slot name="stepDesign">
                        </slot>
                    </div>
                </div>

                <div class="row input">
                    <div class="col">
                        <form @submit.prevent="changeStep(stepNumber+1)" :key="stepNumber">
                            <zek-column-content :column="content()" />

                            <span class="desc" v-if="currentStep.description">{{currentStep.description}}</span>
                            <div class="row text-center message">
                                <zek-text v-if="successMessage" :text="successMessage" class="text-success"></zek-text>
                                <zek-text v-if="errorMessage" :text="errorMessage" class="text-danger login-error-message"></zek-text>
                            </div>
                            <div class="row justify-content-center buttons">
                                <div class="col-auto back-button" v-if="allowNavigate">
                                    <ZekButton
                                        v-if="stepNumber"
                                        v-bind="backProps"
                                        @onClick="changeStep(stepNumber-1)"
                                    />
                                </div>
                                <div class="col-auto next-button">
                                    <ZekButton
                                        v-if="stepNumber<steps.length"
                                        v-bind="nextProps"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="completed" class="row completed-screen">
            <div class="col text-center">
                <slot name="formCompleted">
                    <h1> Thank you for completing the form.</h1>
                    <h3> Press the submit button below to complete the form submission. Or you can go back to review your answers.</h3>
                    <ZekButton
                        v-bind="backProps"
                        @onClick="changeStep(stepNumber-1)"
                    />
                    <ZekButton
                        :label="'Submit'"
                        :theme="'Bootstrap'"
                        @onClick="submitForm"
                    />
                </slot>
            </div>
        </div>
    </div>
</template>

<script>
import ZekButton  from "../action-button/ActionButton.vue";
import ZekColumnContent from "../column-content/ColumnContent.vue";
import ZekText from "../text-block/TextBlock.vue";
export default {
    name: "ZekGuidedForm",
    components: {ZekButton, ZekColumnContent, ZekText },
    props: {
        steps: {
            type: Array,
            required: true,
            default: () => []
         },
        // showProgress: Boolean,
        allowNavigate: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ""
        },
        styleObj: Object,
        backButton: {   //for string it is button label, for object it should be button component props
            type: [String, Object],
            default: ""
        },
        nextButton: {
            type: [String, Object],
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
        step: {
            type: Number,
            default: 0
        },
         id: {
            type: [String, Number],
            default: ""
        },
    },
    data() {
        return {
            content: () => {
                const step = this.currentStep;
                return {
                    columnWidth: step.columnWidth || 12,
                    content: {
                        component: step.type == 'long-text' ? 'textarea' : step.type === 'radio' ? 'radio-button' : step.type === 'toggle-button' ? 'toggle-button' : step.type === 'dropdown' ? 'dropdown' : step.type === 'file-upload' ? 'file-upload' : 'input',
                        data: step,
                        events: (step.type == 'long-text' || step.type == 'file-upload') ?  {
                            onChange: (e) => {
                                this.formData[step.name] = e;
                                this.formSteps[this.stepNumber].value = e;
                                this.formSteps[this.stepNumber].initialValue = e;
                                this.emitLatestData(step.name);
                            }
                        } :
                        step.type == 'dropdown' ? {
                            onSelect: e => {
                                let value = step.selectType && step.selectType.toLowerCase()!='single'? e : e[0];
                                this.formData[step.name] = value;
                                this.formSteps[this.stepNumber].value = value;
                                this.formSteps[this.stepNumber].initialValue = value;
                                this.emitLatestData(step.name);
                            }
                        } :
                        step.type == 'toggle-button' ? {
                            onToggle: e => {
                                this.formData[step.name] = e.selected;
                                this.formSteps[this.stepNumber].value = e.selected;
                                this.formSteps[this.stepNumber].initialValue = e.selected;
                                this.emitLatestData(step.name);
                            }
                        } :
                        {
                            onInput: (e) => {
                                if ( step.inputType === 'checkbox' ) {
                                    this.formData[step.name] = e.target.checked;
                                    this.formSteps[this.stepNumber].value = e.target.checked;
                                    this.formSteps[this.stepNumber].initialValue = e.target.checked;
                                } else if ( step.inputType === 'radio' ) {
                                    this.formData[step.name] = e.value;
                                this.formSteps[this.stepNumber].value = e.value;
                                this.formSteps[this.stepNumber].initialValue = e.value;
                                } else {
                                    this.formData[step.name] = e.target.value;
                                    this.formSteps[this.stepNumber].value = e.target.value;
                                    this.formSteps[this.stepNumber].initialValue = e.target.value;
                                }
                                this.emitLatestData(step.name)
                            }
                        }
                    }
                }
            },
            completed: false,
            currentStep: null,
            stepNumber: 0,
            formData: {},
            formSteps: this.steps
        }
    },
    created() {
        if(this.steps && this.steps.length) {
            this.currentStep = { ...this.formSteps[this.stepNumber] };
        }
    },
    computed: {
        backProps() {
            let props;
            if (typeof (this.backButton) == 'string') {
                props = {
                    label: this.backButton,
                }
            } else {
                props = this.backButton || {}
            }
            return {
                theme: 'Bootstrap',
                buttonType: 'button',
                label: 'Back',
                ... props
            };
        },
        nextProps() {
            let props;
            if (typeof (this.nextButton) == 'string') {
                props = {
                    label: this.nextButton,
                }
            } else {
                props = this.nextButton || {}
            }
            return {
                theme: 'Bootstrap',
                buttonType: 'submit',
                label: 'Continue',
                ... props
            };
        }
    },
    methods: {
        emitLatestData(fieldName) {
            this.$emit('update', {
                fieldName,
                data: this.formData
            });
        },
        submitForm() {
            this.$emit('onSubmit', this.formData);
        },
        onAnswer(event) {
            let value;
            if(this.currentStep.type == 'dropdown') {
                value = this.currentStep.multiple? event : event[0];
            } else if(this.currentStep.type == 'longText') {
                value = event;
            } else {
                value = this.currentStep.type=='checkbox' ? event.target.checked : event.target.value;
            }
            this.formSteps[this.stepNumber].value = value;
        },
        changeStep(number) {
            if(this.currentStep) {
                this.formData[this.currentStep.name || this.currentStep.id] = this.formSteps[this.stepNumber].value || this.formSteps[this.stepNumber].initialValue;
            }
            this.stepNumber = number;
            this.currentStep = { ...{}, ...this.formSteps[this.stepNumber] };
            if(this.stepNumber<this.steps.length) {
                this.completed = false;
                this.$emit('onStep', number);
            } else {
                this.completed = true;
                this.currentStep = null;
                this.$emit('onComplete', this.formData)
            }
        }
    }

}
</script>

<style lang="scss" scoped>

</style>
