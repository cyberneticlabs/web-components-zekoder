<template>
    <div ref="zekSlider" class="slider-content" :style="styleObj" @click="$emit('onClick', $event)">
        <VueSlickCarousel
            ref="slider"
            :initialSlide="currentSlide"
            :slidesToShow="slidesToShow"
            :arrows="showArrows"
            :infinite="isInfinite"
            :fade="fadeEffect"
            :autoplay="autoPlay"
            :autoplaySpeed="speed"
            :dots="showDots"
            :speed="300"
            v-bind="settings"
            v-on="events"
        >
            <div v-for="(slide, i) in slides" :key="i">
                <div class="slide-content" :style="getSlideStyle(slide)">
                    <img
                        v-if="slide.pic"
                        :class="`w-100 slide-image slide-image-${i}`"
                        :src="slide.pic"
                        :style="slide.picStyle"
                    />
                    <ZekVideo v-if="slide.video" v-bind="slide.video" v-on="slide.video.events" />
                    <div class="text-section" :style="getTextStyle(slide)">
                        <h1 v-if="slide.heading">{{ slide.heading }}</h1>
                        <h3 v-if="slide.subHeading">{{ slide.subHeading }}</h3>
                        <p v-if="slide.description && !slide.bulletsBefore">{{ slide.description }}</p>
                        <zek-list v-if="slide.bullets" :listItems="slide.bullets"></zek-list>
                        <p v-if="slide.description && slide.bulletsBefore">{{ slide.description }}</p>
                        <div :class="`slide-details slide-details-${i}`" v-if="slide.details && slide.details.length">
                            <p
                                v-for="(detail, i) in slide.details"
                                :key="i"
                                :class="`slide-detail-${i}`"
                                :style="detail.style ? detail.style : ''"
                            >
                                {{ detail.text ? detail.text : detail }}
                            </p>
                        </div>
                        <zek-button
                            v-if="slide.button"
                            :theme="'bootstrap'"
                            :url="slide.button.url"
                            :type="slide.button.showLink ? 'link' : ''"
                            :label="slide.button.text"
                            :style="{ float: slide.button.position == 'right' ? 'right' : '' }"
                        ></zek-button>
                    </div>
                </div>
            </div>
            <template v-if="prevArrow" #prevArrow="arrowOption">
                <component
                    :is="prevArrow"
                    :currentSlide="arrowOption.currentSlide"
                    :slideCount="arrowOption.slideCount"
                />
            </template>
            <template v-if="nextArrow" #nextArrow="arrowOption">
                <component
                    :is="nextArrow"
                    :currentSlide="arrowOption.currentSlide"
                    :slideCount="arrowOption.slideCount"
                />
            </template>
            <template v-if="customDot" #customPaging="page">
                <component :is="customDot" :page="page" />
            </template>
        </VueSlickCarousel>
    </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import ZekButton from "../action-button/ActionButton.vue";
import ZekList from "../lists-block/ListsBlock.vue";
import ZekVideo from "../video/Video.vue";

export default {
    name: "ZekSlider",
    components: { VueSlickCarousel, ZekButton, ZekList, ZekVideo },
    props: {
        slidesToShow: {
            type: Number,
            default: 1
        },
        showArrows: {
            type: Boolean,
            default: false
        },
        isInfinite: {
            type: Boolean,
            default: true
        },
        fadeEffect: {
            type: Boolean,
            default: false
        },
        autoPlay: {
            type: Boolean,
            default: true
        },
        speed: {
            type: Number,
            default: 2000
        },
        showDots: {
            type: Boolean,
            default: true
        },
        slides: {
            type: Array,
            default: () => []
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        prevArrow: {
            type: Object,
            default: () => ({})
        },
        nextArrow: {
            type: Object,
            default: () => ({})
        },
        customDot: {
            type: Object,
            default: () => ({})
        },
        settings: {
            type: Object,
            default: () => ({})
        },
        events: {
            type: Object,
            default: () => ({})
        },
        currentSlide: {
            type: Number,
            default: 0
        },
        id: {
            type: [String, Number],
            default: ""
        },
    },
    data() {
        return {
            slideStyle: {}
        };
    },
    methods: {
        getSlideStyle(slide) {
            let slideStyle = slide.style || {};
            let background = {};
            if (slide.image && slide.image.url) {
                background = {
                    backgroundImage: "url('" + slide.image.url + "')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: slide.image.cover == "half" ? "50%" : slide.image.cover == "full" ? "100%" : "",
                    backgroundPosition: slide.image.position
                };
            }
            return {
                ...background,
                ...slideStyle
            };
        },
        getTextStyle(slide) {
            return {
                width: slide.textCover == "half" ? "50%" : "",
                float: slide.textPosition == "right" ? "right" : "",
                ...slide.textStyle
            };
        }
    },
    watch: {
        currentSlide: function(val) {
            this.$refs.slider.goTo(val);
        }
    }
};
</script>

<style lang="scss">
.slider-content {
    padding: 0 40px;
}
</style>
