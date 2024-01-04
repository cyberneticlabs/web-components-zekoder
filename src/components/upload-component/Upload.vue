<template>
  <div ref="zekUpload" :style="styleObj"  :class="customClass + '-container'">
    <div v-if="showPreview && type == 'image'" :style="previewSettings">
      <img
        v-for="(item, i) in uploaded"
        :key="i"
        alt="uploaded-image"
        :src="item"
        style="height: 100%; width: 100%"
      />
    </div>
    <!-- <div v-if="showPreview && type != 'image'" :style="previewSettings">
      <embed v-for="(item, i) in uploaded" :key="i" :src="item" />
    </div> -->
    <input
      :type="type"
      :id="id"
      :name="name"
      :style="inputStyle"
      :class="customClass"
      :accept="fileTypes"
      :multiple="multiple"
      @change="onFileChange"
    />
  </div>
</template>

<script>
export default {
  name: "ZekUpload",
  props: {
    type: {
      type: String,
      default: ""
    },
    acceptedFileTypes: {
      type: Array,
      default: () => [],
    },
    showPreview: {
      type: Boolean,
      default: false,
    },
    previewSettings: {
      type: Object,
      default: () => ({}),
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    customClass: {
        type: String,
        default: "zek-upload",
    },
    styleObj: {
        type: Object,
        default: () => ({})
    },
      inputStyle: {
        type: Object,
        default: () => ({})
      },
  },
  computed: {
    fileTypes() {
      return this.type == "image"
        ? this.acceptedFileTypes.map((e) => `image/${e}`).toString()
        : this.acceptedFileTypes.map((e) => `.${e}`).toString();
    },
  },
  data() {
    return {
      uploaded: "",
    };
  },
  methods: {
    onFileChange(e) {
      const files = e.target.files;
      if (files.length) {
        // if (this.type == "image") {
        this.uploaded = Object.keys(files).map((e) =>
          URL.createObjectURL(files[e])
        );
        // } else {
        //   this.uploaded = files[0].name;
        // }
      }
      this.$emit("onUpload", files);
    },
  },
};
</script>

<style lang="scss">
</style>
