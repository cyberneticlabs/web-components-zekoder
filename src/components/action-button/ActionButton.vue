<template>
    <button
        :type="buttonType"
        @click="clicked($event)"
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
        v-on="extraEvents"
        v-bind="extraProps"
        :class="getClasses()"
        :disabled="disabled"
        :style="styleObj"
        ref="zekButton"
        >

        <span v-if="theme=='material'" class="mdc-button__ripple"></span>

        <span v-if="label && iconTrailing" :class="{'mdc-button__label': theme=='material'}" :style="{marginRight: icon&&theme!='material'?'8px':''}">{{label}}</span>

        <i v-if="icon && theme=='material'" class="material-icons mdc-button__icon" :style="{marginRight: !label?'0px':''}" aria-hidden="true">{{icon}}</i>
        <i v-else-if="icon" :class="[icon, label&&!iconTrailing?'icon':'']"></i>

        <span v-if="label && !iconTrailing" :class="{'mdc-button__label': theme=='material'}">{{label}}</span>

        <span v-if="loading" class="loading-spinner" :class="{'mdc-button__label': theme=='material'}"></span>
    </button>
</template>

<script>

export default {
    name: 'ZekButton',
    props: {
        theme: {
            type: String,
            default: 'custom'
        },
         id: {
            type: String,
            default: ""
        },
        styleObj: {
            type: Object,
            default: ()=>{return{
                color: 'black',
                border: '2px solid black',
                padding: '5px 10px'
            }}
        },
        label: {
            type: String,
            default: 'Text Button'
        },
        url: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ""
        },
        size: {
            type: String,
            default: ""
        },
        active: {
            type: Boolean,
            default: false
        },
        outlineButton: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: ""
        },
        iconTrailing: {
            type: Boolean,
            default: false
        },
        buttonType: {
            type: String, //button, submit etc
            default: 'button'
        },
         extraEvents: {
            type: Object,
            default: () => ({})
        },
        extraProps: {
            type: Object,
            default: () => ({})
        },
    },
    data(){
      return {
          isHovering: false
      }
    },
    methods: {
        clicked(event) {
            this.$emit('onClick', event);
            if( this.url ) {
                if ( this.url[0] == '/' ) {
                    this.$router?.push(this.url);
                } else {
                    window.location.assign(this.url);
                }
            }
        },
        getClasses() {
            const classList = ['zek-button'];
            if ( this.customClass ) { classList.push(this.customClass) };
            if(this.theme == 'bootstrap') {
                classList.push('btn');

                let outline = this.outlineButton? 'outline-':'';
                let type = this.type? this.type.toLowerCase() : 'primary';
                classList.push('btn-' + outline + type);

                if (this.disabled) {
                    classList.push('disabled');
                }
                if (this.size) {
                    classList.push(this.size=='large'? 'btn-lg' : this.size=='small'? 'btn-sm' : this.size=='block'? 'btn-block' : '');
                }
                if(this.active) {
                    classList.push('active');
                }
            } else if(this.theme == 'material') {
                classList.push('mdc-button')
                if(this.outlineButton) {
                    classList.push('mdc-button--outlined');
                } else if(this.type == 'raised') {
                    classList.push('mdc-button--raised')
                } else if (this.type == 'link') {
                    classList.push('underlined-button');
                }
            }
            return classList;
        }
    },
    watch:{
        isHovering(val) {
            this.$emit('onHover', val);
        }
    }
  }
</script>

<style scoped lang="scss">

.loading-spinner {
    margin-left: 10px;
    border-radius: 100%;
    border-top: 2px solid #1E282C;
    display: inline-block;
    height: 12px;
    width: 12px;
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

.underlined-button {
    text-decoration: underline;
}

.icon {
    margin-right: 8px;
}

</style>
