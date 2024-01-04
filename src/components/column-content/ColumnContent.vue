<template>
    <div
        class="column-content-wrapper"
        ref="zekColumnContent"
        v-if="column && ((column.rows && column.rows.length) || column.content)"
        v-show="column.condition != undefined ? column.condition : true"
        :key="key"
        :class="{
            customClass,
            'content-container': column.content && Array.isArray(column.content)
        }"
        :style="styleObj"
    >
        <template v-if="column && column.rows && column.rows.length">
            <div
                v-for="(row, i) in column.rows"
                :key="'row' + i"
                class="row"
                v-bind="row.props"
                v-on="row.events"
                :id="row.id"
                :class="row.class"
                v-show="row.condition != undefined ? row.condition : true"
                @click.stop="emitClick('rowClicked', { column: column, row: row, index: i })"
            >
                <div
                    v-for="(col, index) in row.columns"
                    :key="'col' + index"
                    :class="(col.columnWidth ? 'col-' + col.columnWidth : 'col') + ' ' + (col.class || '')"
                    :id="col.id"
                    v-bind="col.props"
                    v-on="col.events"
                    v-show="col.condition != undefined ? col.condition : true"
                    @click.stop="emitClick('colClicked', { column: col, row: row, index: index })"
                >
                    <zek-column-content
                        :column="col"
                        @rowClicked="emitClick('rowClicked', $event)"
                        @colClicked="emitClick('colClicked', $event)"
                    ></zek-column-content>
                </div>
            </div>
        </template>
        <template v-else-if="column && column.content && Array.isArray(column.content) && column.content.length">
            <zek-column-content
                v-for="(content, i) in column.content"
                :key="'content' + i + key"
                :column="{ content, condition: content.condition }"
            ></zek-column-content>
        </template>
        <template v-else-if="column && column.content && column.content.type == 'custom'">
            <component
                :is="column.content.component"
                v-bind="column.content.data"
                v-on="column.content.events"
            ></component>
        </template>
        <template v-else-if="column && column.content">
            <component
                :is="components[column.content.component]"
                v-bind="column.content.data"
                v-on="column.content.events"
            ></component>
        </template>
    </div>
</template>
<script>
export default {
    name: "ZekColumnContent",
    props: {
        column: {
            //column can have rows or a component. Each row must have columns, columns can have more rows. Component can only be inside a column
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => {
                return {};
            }
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            key: Math.ceil(Math.random() * 100000),
            components: {
                button: require("../action-button/ActionButton.vue").default,
                heading: require("../heading-block/HeadingBlock.vue").default,
                html: require("../html-block/HtmlBlock.vue").default,
                image: require("../image/Image.vue").default,
                list: require("../lists-block/ListsBlock.vue").default,
                text: require("../text-block/TextBlock.vue").default,
                initials: require("../initials/Initials.vue").default,
                video: require("../video/Video.vue").default,
                "radio-button": require("../radio-button/RadioButton.vue").default,
                "countries-list": require("../countries-list/CountriesList.vue").default,
                dropdown: require("../dropdown/Dropdown.vue").default,
                input: require("../input-field/InputField.vue").default,
                form: require("../form/Form.vue").default,
                textarea: require("../textarea/Textarea.vue").default,
                card: require("../card/Card.vue").default,
                "collapsible container": require("../collapsible-container/CollapsibleContainer.vue").default,
                table: require("../table/Table.vue").default,
                "file-upload": require("../file-upload/FileUpload.vue").default,
                "toggle-button": require("../toggle-button/ToggleButton.vue").default,
                slider: require("../slider/Slider.vue").default,
                captcha: require("../re-captcha/ReCaptcha.vue").default
            }
        };
    },
    methods: {
        stopPropagation(event) {
            event.stopPropagation();
        },
        emitClick(name, obj) {
            this.$emit(name, obj);
        }
    }
};
</script>
