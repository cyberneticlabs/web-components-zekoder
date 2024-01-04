<template>
    <div class="countries-list" :class="customClass" :style="styleObj">
        <ZekDropdown
            v-if="countries && countries.length"
            :cssClass="'countries-dropdown'"
            v-bind="dropdownProps"
            :items="countries"
            @onSelect="$emit('onSelect', $event)"
            ref="zekCountriesList"
            v-on="extraEvents"
        ></ZekDropdown>
    </div>
</template>

<script>
import ZekDropdown from "../dropdown/Dropdown.vue";
export default {
    name: "ZekCountriesList",
    components: {
        ZekDropdown
    },
    props: {
        dropdownProps: {
            type: Object,
            default: () => ({})
        },
        code: {
            type: String,
            default: "alpha3"
        },
        customClass: {
            type: String,
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        extraEvents: {
            type: Object,
            default: () => ({})
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            countries: []
        };
    },
    created() {
        fetch("https://cdn.jsdelivr.net/npm/world_countries_lists@latest/data/countries/en/countries.json")
            .then(response => response.json())
            .then(json => {
                this.countries = json.map(country => {
                    return {
                        text: country.name,
                        value: country[this.code]
                    };
                });
            });
    }
};
</script>

<style lang="scss">
.countries-list {
}
</style>
