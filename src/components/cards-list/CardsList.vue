<template>
    <div
        class="cards-list"
        :class="customClass"
        :style="listStyle"
        ref="zekCardList"
    >
        <zek-card
            v-for="(card,i) in cards"
            :key="i"
            :id="i"
            :styleObj="{...styleObject, ...card.styleObj}"
            v-bind="card"
        ></zek-card>
    </div>
</template>

<script>
import ZekCard from "../card/Card.vue"
export default {
    components: { ZekCard },
    name: "ZekCardsList",
    props: {
        id: {
            type: String,
            default: ""
        },
        cardsHeight: {
            type: String,
            default: ""
        },
        cardsWidth: {
            type: String,
            default: ""
        },
        customClass: {
            type: String,
            default: ""
        },
        cards: {
            type: Array,
            default: () => ([])
        },
        rows: {
            type: Number,
            default: 1
        },
        columns: {
            type: Number,
            default: 1
        },
        styleObj: {    //for parent container
            type: Object,
            default: () => ({})
        },
        cardStyle: {   //for cards
            type: Object,
            default: () => ({})
        },
        direction: {  //top-down, down-top, left-right, right-left
            type: String,
            default: ""
        },
        cardsGap: {
            type: [Number,String],
            default: '10px'
        }
    },
    computed: {
        styleObject() {
            return {
                width: isNaN(+this.cardsWidth) ? this.cardsWidth : this.cardsWidth+'px',
                height: isNaN(+this.cardsHeight) ? this.cardsHeight : this.cardsHeight+'px',
                overflow: 'auto',
                flexShrink: 0,
                flexBias: isNaN(+this.cardsWidth) ? this.cardsWidth : this.cardsWidth+'px',
                ...this.cardStyle,
            };
        },
        listStyle() {
            let dir = ''
            if(this.direction == 'top-down' && this.rows>1) {
                dir = 'column'
            } else if(this.direction == 'down-top' && this.rows>1) {
                dir = 'column-reverse'
            } else if(this.direction == 'right-left' && this.columns>1) {
                dir = 'row-reverse'
            } else {
                dir = 'row'
            }

            let gap = isNaN(+this.cardsGap) ? +this.cardsGap.match(/(\d+)/)[0] : +this.cardsGap;
            let listHeight= this.rows * (+this.styleObject.height.match(/(\d+)/)[0]+gap);
            let listWidth= this.columns * (+this.styleObject.width.match(/(\d+)/)[0]+gap);
            return {
                flexDirection: dir,
                gap: isNaN(+this.cardsGap) ? this.cardsGap : this.cardsGap+'px',
                height: listHeight+20+'px',
                width: listWidth+gap+'px',
                flexWrap: this.rows==1 || this.columns==1 ? 'nowrap' : 'wrap',
                ...this.styleObj
            };
        }
    },
}
</script>

<style scoped lang="scss">
.cards-list {
    display: flex;
    overflow: auto;
}

</style>
