<template>
    <div
        class="initials"
        :class="customClass"
        :style="styleObj"
        ref="zekInitials"
    >
        <span>{{initials}}</span>
    </div>
</template>

<script>

  export default {
    name: 'ZekInitials',
    props: {
        name: {
            type: String,
            default: ""
        },
        charactersToShow: {
            type: Number,
            default: 0
        },
        customClass: {
            type: String,
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        },
    },
    data() {
        return {
            initials: null
        }
    },
    created() {
        this.initials = this.getInitials(this.name);
    },
    methods: {
        getInitials(name) {
            const wordsInName = name.split(' ');
            if ( wordsInName.length && this.charactersToShow === 1 ) {
                return this.name.charAt(0);
            } else if ( wordsInName.length > 1 && this.charactersToShow > 1 ) {
                return wordsInName[0].charAt(0)+wordsInName[1].charAt(0);
            }
        }
    }
  }
</script>

<style lang="scss">
    .initials {
        margin: 0 auto;
        text-align: center;
        color: #ffffff;
        border-radius: 50%;
        height: 75px;
        width: 75px;
        line-height: 75px;
        font-size: 3.5em;
    }
</style>
