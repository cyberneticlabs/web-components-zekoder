<template>
    <div class="zek-file-upload" :style="styleObject">
        <span v-if="label" :style="label.style">
            <span v-html="label.html || label.text || label" ></span>
            <span class="required-asterik" v-if="required">*</span>
        </span>

        <file-pond
            name="file-upload"
            ref="pond"
            :accepted-file-types="acceptedFileTypes"
            :label-idle="placeholder"
            :allowMultiple="multiple"
            :files="preloadedFiles"
            :credits="null"
            :required="required"
            :disabled="disabled"
            :className="'zek-pond' + customClass"
            :stylePanelLayout="stylePanelLayout"
            :style="{ width, height, ...inputStyle }"
            :allowImagePreview="allowImagePreview"
            :allowRemove="!readonly"
            v-bind="extraProps"
            v-on="extraEvents"
            @addfile="uploadFiles"
            @removefile="deleteFile"
            @activatefile="onClick"
        />
        <ZekButton
            v-if="deleteButton"
            v-bind="deleteButton"
            @onClick="removeFile"
        />
    </div>
</template>

<script>
import * as axios from 'axios';
 import vueFilePond from 'vue-filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import ZekButton from "../action-button/ActionButton.vue";

// Create component
const FilePond = vueFilePond(
    FilePondPluginFileValidateType,
    FilePondPluginImagePreview
)
export default {
    name: "ZekFileUpload",
    components: {
        FilePond,
        ZekButton
    },
    props: {
        deleteButton: {
            type: Object,
            default: () => ({})
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100%"
        },
        label: {
            type: [String, Object],
            default: ""
        },
        required: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: false
        },
        dragDrop: {
            type: Boolean,
            default: false
        },
        uploadUrl: {
            type: String,
            default: ""
        },
        fetchUrl: {
            type: String,
            default: ""
        },
        dataKey: {
            type: String,
            default: "id"
        },
        showLoader: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: "",
        },
        inputStyle: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        },
        styleObject: {
            type: Object,
            default: () => ({
                position: "relative"
            }),
        },
        name: {
            type: String,
            default: "",
        },
        id: {
            type: String,
            default: "file-upload-input",
        },
        placeholder: {
            type: String,
            default: "",
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        stylePanelLayout: {
            //https://pqina.nl/filepond/docs/api/instance/properties/#styles
            type: String,
            default: "compact circle"
        },
        extraProps: {
            type: Object,
            default: () => ({})
        },
        files: {
            type: Array,
            default: () => []
        },
        existingIds: {
            type: Array,
            default: () => []
        },
        acceptedFileTypes: {
            type: Array,
            default: () => ["image/jpeg, image/png, image/jpg"]
        },
        allowImagePreview: {
            type: Boolean,
            default: () => false
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            loading: false,
            preloadedFiles: this.files,
            fileIds: this.existingIds
        }
    },
    methods: {
        onClick($event) {
            this.$emit('onClick', $event);
        },
        uploadFiles(error, fileObject) {
            if ( error ) {
                return;
            }

            // if same file as preloaded file, do nothing (only for single file upload)
            if ( !this.multiple && this.preloadedFiles && this.preloadedFiles.length ) {
                const preloadedFile = this.preloadedFiles.find(file => file === fileObject.file.name || file === fileObject.source);
                if ( preloadedFile ) {
                    return;
                }
            }

            const file = fileObject.file;

            // this check will only work if files are being uploaded using zecommons
            if ( '.'+file.type.split('/')[1] === file.name ) {
                // if ( !this.multiple ) { this.$emit("onChange", null) }
                return;
            }

            if (!this.uploadUrl || !file) {
                this.$emit("onChange",this.multiple ? files : (file || null))
                return;
            } else {
                let formData = new FormData();
                formData.append('file', file);
                axios({
                    method: 'post',
                    url: this.uploadUrl,
                    data: formData
                }).then(res => {
                    if ( res && res.data && res.data[this.dataKey] ) {
                        if ( this.multiple ) {
                            this.fileIds.push(this.fetchUrl+res.data[this.dataKey])
                            this.$emit('onChange', this.fileIds)
                        } else {
                            this.$emit('onChange', this.fetchUrl+res.data[this.dataKey])
                        }
                    }
                }).catch(err => {
                    console.log(err);
                });

            }
        },
        deleteFile(error, file) {
            if ( error ) { return; }

            // Special event for removal
            this.$emit('onRemove', file);

            if ( this.multiple ) {
                const fileId = (file.source.split('=')[1]).split('&')[0];
                this.fileIds.splice(this.fileIds.indexOf(fileId), 1);
                this.$emit('onChange', this.fileIds);
            } else {
                this.$emit('onChange', null)
            }

        },
        removeFile(item) {
            if ( this.multiple ) {
                this.fileIds = this.fileIds.filter(id => id !== item.serverId)
                this.$emit('onChange', this.fileIds)
            } else {
                this.$emit('onChange', null)
            }
        }
    }
};
</script>
<style lang="scss" scoped>
:deep(.zek-pond) {
    height: 100%;
    * {
        cursor: pointer;
    }
    .filepond--drop-label {
        height: 100%;
    }
    .filepond--panel-root {
        background: transparent;
    }
}
</style>
