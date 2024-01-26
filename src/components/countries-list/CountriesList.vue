<template>
    <div class="countries-list">
        <ZekDropdown
            v-if="countries && countries.length"
            :cssClass="'countries-dropdown'"
            v-bind="dropdownProps"
            :items="countries"
            @onSelect="$emit('onSelect', $event)"
        ></ZekDropdown>
    </div>
</template>

<script>
import ZekDropdown from '../dropdown/Dropdown.vue';
export default {
    name: 'ZekCountriesList',
    components: {
        ZekDropdown
    },
    props:{
        dropdownProps: Object,
        code: {
            type: String,
            default: 'alpha3'
        },
        lang: {
            type: String,
            default: 'en'
        },
    },
    data() {
        return {
            countries: []
        }
    },
    created() {
        fetch(`https://cdn.jsdelivr.net/npm/world_countries_lists@latest/data/countries/${this.lang}/countries.json`)
        .then((response) => response.json())
        .then((json) => {
            this.countries = json.map((country) => {
                return {
                    text: country.name,
                    value: country[this.code]
                }
            });
        });
    }
}
</script>

<style lang="scss">
.countries-list {

}
</style>
