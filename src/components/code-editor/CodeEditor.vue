<template>
    <div class="zek-code-editor" :style="styleObj">
        <editor
            ref="codeEditor"
            v-model="content"
            @init="editorInit"
            :lang="language"
            :theme="theme"
            :width="width"
            :height="height"
            :class="customClass"
            :options="{
                fontSize: fontSize,
                enableSnippets: enableSnippets,
                enableBasicAutocompletion: enableAutoComplete,
                enableLiveAutocompletion: enableAutoComplete,
                placeholder: 'Enter your code here...',
                ...options
            }"
            v-on="extraEvents"
            v-bind="extraProps"
        ></editor>
        <ZekChatPrompt :show="showPrompt" :loading="loading" :customClass="'zek-code-editor-prompt'" v-bind="prompt" @onSend="sendPrompt"></ZekChatPrompt>
    </div>
</template>

<script>
import editor from "vue2-ace-editor";
import ZekChatPrompt from "../chat-prompt/ChatPrompt.vue";
export default {
    name: "ZekCodeEditor",
    components: {
        editor,
        ZekChatPrompt
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100px"
        },
        value: {
            type: String,
            default: undefined
        },
        customClass: {
            type: String,
            default: ""
        },
        language: {
            // ? Can be any language from https://github.com/thlorenz/brace/tree/master/mode
            type: String,
            default: "python"
        },
        theme: {
            // ? Can be any theme from https://github.com/thlorenz/brace/tree/master/theme
            type: String,
            default: "monokai"
        },
        fontSize: {
            type: Number,
            default: 14
        },
        enableSnippets: {
            type: Boolean,
            default: true
        },
        enableAutoComplete: {
            type: Boolean,
            default: true
        },
        errors: {
            // ? Array of objects with {row, column, text and type} properties
            type: Array,
            default: () => []
        },
        options: {
            type: Object,
            default: () => ({})
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        extraProps: {
            type: Object,
            default: () => ({})
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        },
        showPrompt: {
            type: Boolean,
            default: true
        },
        prompt: {
            type: Object,
            default: () => ({
                show: false,
                loading: false,
                isPopup: false,
                initialMessage: "",
                username: "",
                placeholder: "Type a message...",
                textarea: {},
                footNote: ""
            })
        }
    },
    data() {
        return {
            content: this.value || undefined,
            annotations: []
        };
    },
    mounted() {
        this.$emit("openZeChat", this.prompt);
    },
    methods: {
        sendPrompt(message) {
            this.$emit("onSendPrompt", message);
        },
        editorInit(editor) {
            try {
                require("brace/ext/language_tools"); //language extension prerequsite...
                require("brace/ext/error_marker");
                require(`brace/mode/${this.language}`);
                require(`brace/theme/${this.theme}`);
                require(`brace/snippets/${this.language}`); //snippet
            } catch (e) {
                console.error(`Error Initiating ZekCodeEditor: ${e}`);
            }
            // Prevent scrolling of the page when scrolling within the editor
            editor.container.addEventListener("mousewheel", function(event) {
                event.preventDefault();
                event.stopPropagation();
            });

            // Prevent scrolling of the page when using arrow keys within the editor
            editor.container.addEventListener("keydown", function(event) {
                if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                    event.preventDefault();
                    event.stopPropagation();
                }
            });
        },
        handleError(annotations) {
            // Filter annotations with type 'error'
            const errorAnnotations = annotations.filter(annotation => annotation.type === "error");

            // Emit 'onError' event with the array of error annotations
            this.$emit("onError", errorAnnotations);
        }
    },
    watch: {
        errors(val) {
            // ? Setting Annotations is a bit laggy in the component so timeout is needed
            setTimeout(() => this.$refs.codeEditor.editor.getSession().setAnnotations(val), 100);
        },
        content(val) {
            this.$emit("onInput", val);
            setTimeout(() => (this.annotations = this.$refs.codeEditor.editor.getSession().getAnnotations()), 500);
        },
        value(val) {
            this.content = val;
        },
        annotations(val) {
            this.handleError(val);
        }
    }
};
</script>

<style lang="scss" scoped>
.zek-code-editor {
    width: 100%;
    height: 100%;
    padding: 0.5rem;
}
:deep {
    // webkit-scrollbar
    ::-webkit-scrollbar {
        width: 5px !important;
        &:horizontal {
            height: 5px !important;
        }
    }
    ::-webkit-scrollbar-track {
        background-color: inherit;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #ccc;
        border-radius: 5px;
    }
}
:deep .ace_editor {
    border-radius: 7.5px;
    z-index: 1;
}
.zek-code-editor-prompt{
    margin: 0;
    padding-top: 5px;
    top: -7.5px;
    z-index: 0;
    box-shadow: none;
}
</style>
