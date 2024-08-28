<template>
    <button
        :type="buttonType"
        @click="clicked($event)"
        @mouseover="isHovering = true"
        @mouseleave="isHovering = false"
        v-on="customEvents"
        :class="getClasses()"
        :disabled="disabled"
        :style="styleObj">

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
        styleObj: {
            type: Object,
            default: ()=> ({})
        },
        label: {
            type: String,
            default: 'Text Button'
        },
        url: String,
        type: String,
        disabled: Boolean,
        loading: Boolean,
        customClass: String,
        size: String,
        active: Boolean,
        outlineButton: Boolean,
        icon: String,
        iconTrailing: Boolean,
        buttonType: {
            type: String, //button, submit etc
            default: 'button'
        },
        customEvents: {
            type: Object,
            default: ()=>{return{}}
        }
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
