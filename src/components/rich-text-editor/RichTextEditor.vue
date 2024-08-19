<template>
    <div :class="`zek-rich-editor-container ${customClass}`" :style="styleObj">
        <editor
            class="zek-rich-editor"
            v-model="value"
            :init="config"
            :inline="inline"
            :plugins="config.plugins || ''"
            :height="height"
            :width="width"
            :output-format="config.outputFormat || 'html'"
            :tag-name="config.tagName || 'div'"
            :toolbar="toolbar"
            :disabled="disabled"
            :style="{ height: height, width: width }"
            :initial-value="initialValue"
            api-key="e0et1nvx8siq63nqfxsannuye6uvep23o1at9h1tc8j5e7sr"
            model-events="change keydown blur focus paste"
            ref="tiny"
            @init="editorInit"
            @change="textChange"
            v-bind="{...extraProps}"
            v-on="{...extraEvents}"
        />
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "ZekRichTextEditor",
    components: {
        editor: Editor
    },
    props: {
        customClass: {
            type: String,
            required: false
        },
        styleObj: {
            type: Object,
            required: false
        },
        width: {
            type: String,
            required: false
        },
        height: {
            type: String,
            required: false
        },
        initialValue: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        toolbar: {
            type: String,
            required: false,
            default: "fontselect fontsizeselect | undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | fullscreen | link image media | code"
            // Available toolbars: https://www.tiny.cloud/docs/advanced/available-toolbar-buttons/
        },
        options: {
            type: Object,
            required: false,
            default: () => ({})
            // https://www.tiny.cloud/docs/quick-start/
            // Available plugins
            // 'advlist autolink charmap code codesample directionality emoticons ' +
            // 'fullscreen help hr image imagetools insertdatetime link lists ' +
            // 'media nonbreaking pagebreak paste preview print save searchreplace ' +
            // 'table template textpattern toc visualblocks visualchars wordcount',
        },
        extraProps: {
            type: Object,
            required: false,
            default: () => ({})
        },
        extraEvents: {
            type: Object,
            required: false,
            default: () => ({})
        },
        inline: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            value: this.initialValue || "",
            config: {
                menubar: false,
                toolbar: this.toolbar,
                readonly: this.disabled,
                resize: false,
                ...this.options
            }
        };
    },
    methods: {
        editorInit(e) {
            console.log(e, 'init')
            this.$emit("onInit", e);
        },
        textChange(e, editor) {
            console.log(e, editor)
            this.$emit("onChange", this.value);
        }
    },
    watch: {
        initialValue: {
            handler: function(val) {
                this.value = val;
            },
            immediate: true
        },
        disabled: {
            handler: function(val) {
                this.$refs.tiny?.editor?.setMode(val ? "readonly" : "design");
            },
            immediate: true
        }
    }
};
</script>

<style scoped>
.zek-rich-editor-container {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
