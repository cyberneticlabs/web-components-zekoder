<template>
    <div
        class="collapsible-container w-100"
        :class="customClass"
        :style="styleObj"
    >
        <p>
            <button
                class="btn btn-primary w-100 toggle-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseContent"
                aria-expanded="false"
                aria-controls="collapseContent"
                :style="headerStyles"
                @click="collapsed = !collapsed;"
            >
                <i v-if="headerIcon" class="zek-cc-header-icon" :class="headerIcon"></i>
                {{ headerText }}
                <i class="fas fa-angle-down zek-cc-header-icon"></i>
            </button>
        </p>
        <div class="collapse" :class="{'show': !collapsed}" id="collapseContent">
            <ZekCard
                v-if="content"
                :content="content"
            />
        </div>
    </div>
</template>

<script>
import ZekCard from "../card/Card.vue";

export default {
    components: {
        ZekCard,
    },
    name: "ZekCollapsibleContainer",
    props: {
        content: Object,
        headerText: String,
        headerIcon: String,
        customClass: String,
        headerStyles: Object,
        collapsed: {
            type: Boolean,
            default: false
        },
        styleObj: Object,
    }
};
</script>

<style lang="scss">
    .zek-cc-header-icon {
        margin-top: 4px;
    }
    .toggle-button {
        outline: none;
    }
</style>