<template>
    <div
        ref="zekLoader"
        class="loader-container w-100 h-100 justify-content-center align-items-center d-flex start-0 top-0"
        :class="fullScreen ? 'position-fixed' : 'position-absolute'"
        :style="backgroundStyle"
    >
        <div class="loader">
            <i :style="loaderStyle" :class="customClass ? customClass : 'fas fa-spinner fa-spin fa-3x'"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "ZekLoader",
    props: {
        loaderStyle: {
            type: Object,
            default: () => ({})
        },
        backgroundStyle: {
            type: Object,
            default: () => ({})
        },
        fullScreen: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ""
        },
        id: {
            type: [String, Number],
            default: ""
        },
    }
};
</script>

<style>
.loader-container {
    z-index: 10;
    background: #ffffff99;
}
</style>
