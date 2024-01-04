<template>
    <footer ref="zekFooter" :style="styleObject" :class="customClass">
        <ul v-for="(column, index) in columns" :key="index">
            <li v-for="(link, index) in column.links" :key="index">
                <a :href="link.href" :style="textStyle">{{ link.text }}</a>
            </li>
        </ul>
        <div
            style="display: flex; align-items: center; position: absolute; bottom: 0"
            :style="socialLinksPosition == 'right' || 'left' ? `${socialLinksPosition}:0` : ''"
        >
            <a v-for="(link, i) in socialLinks" :key="i" :href="link.href">
                <i :class="`fab fa-${link.icon}`" style="margin: 0 5px" :style="{ color: textStyle.color }" />
            </a>
        </div>
    </footer>
</template>

<script>
export default {
    name: "ZekFooter",
    props: {
        height: {
            type: String,
            required: true
        },
        columns: {
            type: Array,
            default: () => []
        },
        socialLinks: {
            type: Array,
            default: () => []
        },
        socialLinksPosition: {
            type: String,
            default: "right"
        },
        image: {
            type: String,
            default: ""
        },
        imagePosition: {
            type: String,
            default: "left"
        },
        textStyle: {
            type: Object,
            default: () => ({})
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
    computed: {
        styleObject() {
            return {
                ...this.styleObj,
                position: this.styleObj.position || "relative" || "relative",
                height: this.height || this.styleObj.height || "auto",
                backgroundImage: `url(${this.image})` || this.styleObj.backgroundImage || "",
                backgroundPosition: this.imagePosition || this.styleObj.backgroundPosition || ""
            };
        }
    }
};
</script>

<style scoped lang="scss">
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>
