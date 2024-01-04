<template>
    <div ref="zekImage" :class="customClass" class="image-container" @click="$emit('onClick', $event)">
        <a
            v-if="targetUrl"
            :href="targetUrl"
            :target="'_'+(targetWindow || 'self')"
        >
            <img
                :src="imageUrl"
                :alt="altText"
                :style="styleObject"
                @mouseenter="onHover()"
                @mouseout="onHoverOut()"
                @load="onLoad()"
            >
        </a>
        <img
            v-else
            :src="imageUrl"
            :alt="altText"
            :style="styleObject"
            @mouseenter="onHover()"
            @mouseout="onHoverOut()"
            @load="onLoad()"
        >
        <div v-if="loading" class="loading-spinner"></div>
        <div v-if="isHoverText" class="text-container">
            <zek-text class="hover-text" :text="hover.textOverlay.text" :styleObj="hover.textOverlay.styleObj"></zek-text>
        </div>
    </div>
</template>

<script>
  import ZekText from '../text-block/TextBlock.vue'

  export default {
    name: 'ZekImage',
    components: {ZekText},
    props: {
        url: {
            type: String,
            default: ""
        },
        imageColor: {
            type: String,
            default: ""
        },
        altText: {
            type: String,
            default: ""
        },
        targetUrl: {
            type: String,
            default: ""
        },
        targetWindow: {
            type: String,
            default: ""
        },
        width: {
            type: String,
            default: ""
        },
        height: {
            type: String,
            default: ""
        },
        hover: {
            type: Object,
            default: () => ({})
        },
        crop: {
            type: Object,
            default: () => ({})
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        },
        customClass: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            styleObject : {},
            imageUrl: null,
            isHoverText: false,
            loading: true
        }
    },
    created() {
        this.styleObject = {
            ...this.styleObj,
            width: isNaN(+this.width) ? this.width : this.width+'px',
            height: isNaN(+this.height) ? this.height : this.height+'px'
        };
        this.imageUrl = this.url;
        if ( this.imageColor === 'grayscale' ) {
            this.styleObject['filter'] = 'grayscale(100%)';
        }
        if (this.hover && this.hover.action=='text' && this.hover.textOverlay && this.hover.textOverlay.text) {
            this.isHoverText = true;
        }
        if ( this.crop ) {
            if(this.crop.type == 'round') {
                this.styleObject['objectFit'] = 'cover';
                this.styleObject['borderRadius'] = '50%';
            } else {
                this.styleObject['objectFit'] = 'none';
                let position = this.crop.position || '';
                if(!position) {
                    //setting x axis crop
                    if(this.crop.left) {
                        position = isNaN(this.crop.left) ? '-'+this.crop.left : '-'+this.crop.left+'px';
                    } else if(this.crop.right) {
                        position = isNaN(this.crop.right) ? 'calc(100% + '+ this.crop.right +')' : 'calc(100% + '+ this.crop.right +'px)'
                    } else {
                        position = '50%';
                    }
                    //setting y axis crop
                    if(this.crop.top) {
                        position += isNaN(this.crop.top) ? ' -'+this.crop.top : ' -'+this.crop.top+'px';
                    } else if(this.crop.bottom) {
                        position += isNaN(this.crop.bottom) ? ' calc(100% + '+ this.crop.bottom +')' : ' calc(100% + '+ this.crop.bottom +'px)'
                    } else {
                        position += ' 50%';
                    }
                }
                this.styleObject['objectPosition'] = position;
            }
        }
    },
    methods: {
        onHover() {
            if ( this.hover ) {
                if ( this.hover.action === 'grayscale' ) {
                    this.styleObject['filter'] = 'grayscale(100%)';
                } else if ( this.hover.action === 'normal' ) {
                    this.styleObject['filter'] = 'grayscale(0%)';
                } else if ( this.hover.action === 'picture' ) {
                    this.imageUrl = this.hover.alternatePicture;
                }
            }
        },
        onHoverOut() {
            if ( this.hover ) {
                if ( this.hover.action === 'grayscale' ) {
                    this.styleObject['filter'] = 'grayscale(0%)';
                } else if ( this.hover.action === 'normal' ) {
                    this.styleObject['filter'] = 'grayscale(100%)';
                } else if ( this.hover.action === 'picture' ) {
                    this.imageUrl = this.url;
                }
            }
        },
        onLoad() {
            this.loading = false;
        }
    }
  }
</script>

<style scoped lang="scss">

.image-container {
    position: relative;
    display: inline-block;
}

.text-container {
    background-color: transparent;
    transition: .5s ease;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
}
.hover-text {
    opacity: 0;
    transition: .5s ease;
    top: 50%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.image-container:hover .text-container {
  background-color: rgba(255, 255, 255, 0.5);
}
.image-container:hover .hover-text {
    opacity: 1;
}
.loading-spinner {
  border-radius: 100%;
  border-top: 2px solid #1E282C;
  position: absolute;
  top: 50%;
  left: 50%;
  height: 20px;
  width: 20px;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>
