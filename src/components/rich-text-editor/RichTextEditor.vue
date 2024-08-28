<template>
    <div :class="`zek-rich-editor-container ${customClass}`" :style="styleObj">
        <Editor
            :key="`editor-${resetKey}`"
            :init="{...config, 'content_style': inlineClasses}"
            v-model="value"
            :inline="inline"
            :plugins="options"
            :toolbar="toolbar"
            :disabled="disabled"
            :initialValue="initialValue"
            :tinymceScriptSrc="tinymceScriptSrc"
            @onInit="editorInit"
            @onChange="textChange"
            v-bind="extraProps"
            v-on="extraEvents || {}"
        />
    </div>
</template>

<script>
// For Config options: https://www.npmjs.com/package/@tinymce/tinymce-vue/v/3.2.8?activeTab=code
import Editor from '@tinymce/tinymce-vue'
export default {
    name: "ZekRichTextEditor",
    components: {
        Editor
    },
    props: {
        apiKey: {
            type: String,
            required: false,
            default: "e0et1nvx8siq63nqfxsannuye6uvep23o1at9h1tc8j5e7sr"
        },
        menu: {
            type: Object,
            required: false,
            default: () => ({})
        },
        menubar: {
            type: String,
            required: false,
            default: ""
        },
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
            type: [String, Array],
            required: false,
            default: () => ([
                'advlist autolink autoresize autosave bbcode charmap code codesample directionality emoticons fullpage fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists media nonbreaking noneditable pagebreak paste preview print quickbars save searchreplace spellchecker tabfocus table template textpattern toc visualblocks visualchars wordcount'
            ])
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
            resetKey: 0,
            tinymceScriptSrc: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/5.10.9/tinymce.min.js',
            value: this.initialValue || "",
            inlineClasses: "",
            config: {
                height: this.height,
                width: this.width,
                menu: this.menu,
                menubar: this.menubar,
                toolbar: this.toolbar,
                readonly: this.disabled,
                resize: false,
                ...this.options
            }
        };
    },
    methods: {
        editorInit(e, editor) {
            this.$emit("onInit", e, editor);
        },
        textChange(e, editor) {
            this.$emit("onChange", this.value);
        },
        getInlineClasses(val) {
            const inlineClasses = val.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1].replaceAll("<br />", "").trim() || '';
            if (this.inlineClasses != inlineClasses) {
                this.inlineClasses = inlineClasses;
                this.resetKey++;
            }
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
        },
        value: {
            handler: function(val) {
                this.getInlineClasses(val);
                this.$emit("input", val);
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
