<template>
    <div ref="zekRichTextEditor" :class="`zek-rich-editor-container ${customClass}`" :style="styleObj">
        <vue2-tinymce-editor
            class="zek-rich-editor"
            v-model="value"
            :options="config"
            :height="height"
            :width="width"
            ref="tiny"
            @editorInit="editorInit"
            @editorChange="textChange"
            v-bind="{...extraProps}"
            v-on="{...extraEvents}"
        />
    </div>
</template>

<script>
import { Vue2TinymceEditor } from "vue2-tinymce-editor";  // https://www.npmjs.com/package/vue2-tinymce-editor
export default {
    name: "ZekRichTextEditor",
    components: {
        Vue2TinymceEditor
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
            type: Number,
            required: false
        },
        height: {
            type: Number,
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
        id: {
            type: [String, Number],
            default: ""
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
            this.$emit("onInit", e);
        },
        textChange(e) {
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
