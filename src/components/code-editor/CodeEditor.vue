<template>
    <div class="zek-code-editor">
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
        ></editor>
    </div>
</template>

<script>
import editor from "vue2-ace-editor";
export default {
    name: "ZekCodeEditor",
    components: {
        editor
    },
    props: {
        width: {
            type: String,
            default: "500px"
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
        language: { // ? Can be any language from https://github.com/thlorenz/brace/tree/master/mode
            type: String,
            default: "python"
        },
        theme: {  // ? Can be any theme from https://github.com/thlorenz/brace/tree/master/theme
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
        options: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            content: this.value || undefined
        };
    },
    methods: {
        editorInit() {
            try{
                require("brace/ext/language_tools"); //language extension prerequsite...
                require("brace/ext/error_marker");
                require(`brace/mode/${this.language}`);
                require(`brace/theme/${this.theme}`);
                require(`brace/snippets/${this.language}`); //snippet
            } catch (e) {
                console.error(`Error Initiating ZekCodeEditor: ${e}`);
            }
        },
    },
    watch: {
        content(val) {
            this.$emit("onInput", val);
        },
        value(val) {
            this.content = val;
        }
    }
};
</script>

<style lang="scss" scoped>
.zek-code-editor {
    width: 100%;
    height: 100%;
}
:deep {
    // webkit-scrollbar
    ::-webkit-scrollbar {
        width: 5px;
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
    .ace_gutter {
        padding: 10px 0;
    }
    .ace_scroller {
        padding: 10px 0;
    }
}
</style>