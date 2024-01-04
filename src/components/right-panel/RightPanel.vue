<template>
    <div ref="zekRightPanel" class="right-panel-container">
        <div
            :class="'right-panel p-4 ' + (customClass || '')"
            :style="{ ...styleObj, width, right: show ? '0' : `-${width}` }"
        >
            <transition name="slide">
                <template v-if="showForm">
                    <ZekForm
                        v-if="formProps"
                        v-bind="formProps"
                        @submit="$emit('submit', $event)"
                        @cancel="$emit('cancel', $event)"
                    />
                    <component v-else :is="content.component" v-bind="content.props" v-on="content.events"></component>
                    <!-- <slot v-else></slot> -->
                </template>
            </transition>
        </div>
        <div v-if="show" class="right-panel-background" @click="$emit('cancel')"></div>
    </div>
</template>

<script>
import ZekForm from "../form/Form.vue";

export default {
    name: "ZekRightPanel",
    components: { ZekForm },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formProps: {
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: "500px"
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        content: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            showForm: this.show
        };
    },
    watch: {
        show: function(newVal) {
            if (newVal) {
                this.showForm = true;
                document.body.classList.add("right-panel-open");
            } else {
                document.body.classList.remove("right-panel-open");
                this.showForm = false;
            }
        }
    }
};
</script>

<style lang="scss">
.right-panel-container {
    .right-panel {
        position: fixed;
        z-index: 6;
        height: 100%;
        top: 0;
        bottom: 0;
        background-color: white;
        transition: right 0.7s;
        -webkit-transition: right 0.7s;
        overflow: auto;
    }
    .right-panel-background {
        position: fixed;
        z-index: 5;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background-color: #00000050;
    }
}
.slide-leave-active {
    transition: all 0.7s ease;
}
</style>
