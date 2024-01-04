<template>
    <div ref="zekContainer" :style="styleObject" :class="customClass">
        <slot />
    </div>
</template>

<script>
export default {
    name: "ZekContainer",
    props: {
        direction: {
            type: String,
            default: ""
        },
        backgroundColor: {
            type: String,
            default: ""
        },
        padding: {
            type: String,
            default: ""
        },
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: String,
            default: ""
        },
        size: {
            type: String,
            default: "flexible"
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
    created() {
        this.styleObject = {
            ...this.styleObj
        };
    },
    computed: {
        styleObject() {
            return {
                ...this.styleObj,
                display: this.styleObj.display || "flex",
                overflow: this.styleObj.overflow || "auto",
                flexDirection: this.direction || this.styleObj.flexDirection || "",
                backgroundColor: this.backgroundColor || this.styleObj.backgroundColor || "",
                padding: this.padding || this.styleObj.padding || "",
                width:
                    (this.size == "absolute" ? `${(this.width / 12) * 100}%` : "fit-content") ||
                    this.styleObj.width ||
                    "",
                height: (this.size == "absolute" ? this.height : "fit-content") || this.styleObj.height || ""
            };
        }
    }
};
</script>
