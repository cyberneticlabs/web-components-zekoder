<template>
    <div
        class="zek-dropdown"
        v-click-outside="close"
        :class="{ 'with-filters': allowFiltering }"
        @click="$emit('onClick', $event)"
    >
        <span v-if="showLabel && label" :style="label.style">
            <span v-html="label.html || label.text || label"></span>
            <span class="required-asterik" v-if="required">*</span>
            <i
                class="input-hint-icon far fa-circle-question"
                v-if="hint"
                v-b-tooltip.hover.top
                :title="hint"
                @click="$emit('hintClicked', $event)"
            />
        </span>
        <input type="text" class="hidden-field" :required="required" v-model="selectedText" />
        <!-- Bootstrap -->
        <div
            v-if="theme == 'Bootstrap'"
            :class="'dropdown ' + cssClass + (error ? ' zek-invalid-field' : '')"
            :style="styleObj"
        >
            <button
                class="btn btn-secondary"
                :class="(showIcon ? 'dropdown-toggle' : 'dropdown-toggle no-caret') + (disabled ? ' disabled' : '')"
                @click="onToggle()"
                type="button"
                :style="buttonStyle"
                :disabled="disabled"
            >
                <span :class="!selectedText ? ' dropdown-placeholder' : ''">{{
                    selected.length && showSelected && selectedText ? selectedText : placeholder || label
                }}</span>
                <i v-if="customIcon" :class="customIcon"></i>
            </button>
            <ul v-if="toggle || alwaysOpen" class="dropdown-menu show" style="padding: 0" :style="listStyle">
                <ZekInput
                    v-if="allowFiltering && (toggle || alwaysOpen)"
                    customClass="zek-dropdown-filter filter-string"
                    type="text"
                    :placeholder="filterBarPlaceholder"
                    @onKeyUp="onFilterChange($event)"
                    :icon="showAddIcon ? 'fas fa-plus-circle' : ''"
                    :iconSettings="{
                        position: 'right',
                        clickable: true,
                        style: { position: 'absolute', right: '5px', top: '15px' }
                    }"
                    @iconClicked="addItem"
                    ref="filterInputRef"
                />
                <li
                    class="dropdown-item"
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    :class="
                        selected.includes(item.value || item)
                            ? selectType.toLowerCase() == 'action'
                                ? ''
                                : 'active'
                            : ''
                    "
                    :style="selected.includes(item.value || item) ? selectedItemStyle : itemStyle"
                    @click="onSelect($event, item)"
                >
                    <input
                        v-if="selectType.toLowerCase() == 'multi' && showCheckBox"
                        class="form-check-input pe-none"
                        type="checkbox"
                        v-model="selected"
                        :value="item.value ? item.value : item"
                        id="flexCheckDefault"
                    />
                    <label class="form-check-label pe-none" for="flexCheckDefault">
                        {{ item.text || item }}
                    </label>
                    <i v-if="item.icon" :class="item.icon"></i>
                </li>
            </ul>
        </div>
        <!-- Material -->
        <div v-else-if="theme == 'Material'" :class="cssClass">
            <v-menu offset-y :style="styleObj" :close-on-content-click="selectType.toLowerCase() == 'single'">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on">
                        {{ selected.length && showSelected ? selectedText : placeholder || label }}
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i" @click="onSelect($event, item)">
                        <v-simple-checkbox
                            v-if="selectType.toLowerCase() == 'multi'"
                            :value="selected.includes(item)"
                            @click="onSelect($event, item)"
                        />
                        {{ item }}
                        <v-list-item-title> </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </div>
        <!-- Custom -->
        <div :class="cssClass" :style="styleObj" v-else>
            <button
                style="display: flex; align-items: center; position: relative"
                :style="buttonStyle"
                @click="onToggle()"
                :disabled="disabled"
                type="button"
                :class="disabled ? 'disabled' : ''"
            >
                <span>
                    {{ selected.length && showSelected ? selectedText : placeholder || label }}
                    <i v-if="showIcon" class="fa fa-angle-down" :style="iconStyle"></i>
                </span>
            </button>
            <div :style="listStyle" v-if="toggle || alwaysOpen">
                <ZekInput
                    v-if="allowFiltering && (toggle || alwaysOpen)"
                    customClass="zek-dropdown-filter filter-string"
                    type="text"
                    :placeholder="filterBarPlaceholder"
                    @onKeyUp="onFilterChange($event)"
                    :icon="showAddIcon ? 'fas fa-plus-circle' : ''"
                    :iconSettings="{
                        position: 'right',
                        clickable: true,
                        style: { position: 'absolute', right: '5px', top: '15px' }
                    }"
                    @iconClicked="addItem"
                    ref="filterInputRef"
                />
                <div
                    :style="selected.includes(item) ? selectedItemStyle : itemStyle"
                    v-for="(item, i) in filteredItems"
                    :key="i"
                    href="#"
                    @click="onSelect($event, item)"
                >
                    <input
                        v-if="selectType.toLowerCase() == 'multi' && showCheckBox"
                        type="checkbox"
                        :id="i"
                        v-model="selected"
                        :value="item.value ? item.value : item"
                    />
                     <label class="form-check-label pe-none" for="flexCheckDefault">
                        {{ item.text || item }}
                    </label>
                    <i v-if="item.icon" :class="item.icon"></i>
                </div>
            </div>
        </div>
        <div class="field-error" v-if="error">{{ error }}</div>
    </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import ZekInput from "../input-field/InputField.vue";
export default {
    components: {
        ZekInput
    },
    name: "ZekDropdown",
    props: {
        hint: String,
        customIcon: String,
        showSelected: {
            type: Boolean,
            default: true
        },
        label: {
            type: [String, Object]
        },
        items: {
            // [{text,value},{text,value}] or [text,text]
            type: Array,
            required: true
        },
        value: [String, Array],
        selectType: {
            type: String,
            default: "single"
        },
        theme: {
            type: String
        },
        cssClass: {
            type: String
        },
        showIcon: {
            type: Boolean,
            default: false
        },
        styleObj: {
            type: Object
        },
        buttonStyle: {
            type: Object
        },
        listStyle: {
            type: Object
        },
        itemStyle: {
            type: Object
        },
        selectedItemStyle: {
            type: Object
        },
        iconStyle: {
            type: Object
        },
        allowFiltering: {
            type: Boolean,
            default: false
        },
        filterBarPlaceholder: String,
        placeholder: String,
        showLabel: Boolean, //to be removed later
        required: Boolean,
        disabled: Boolean,
        toggleOnSelect: {
            type: Boolean,
            default: true
        },
        alwaysOpen: {
            type: Boolean,
            default: false
        },
        error: {
            type: String,
            default: ""
        },
        showCheckBox: {
            type: Boolean,
            default: true
        }
    },
    directives: {
        ClickOutside
    },
    data() {
        return {
            toggle: false,
            filteredItems: this.items,
            selected: [],
            showAddIcon: false,
            itemToAdd: "",
        };
    },
    created() {
        if (this.value) {
            this.selected = typeof this.value == "object" ? this.value : [this.value];
        }
    },
    watch: {
        value() {
            this.selected = typeof this.value == "object" ? this.value : [this.value];
        },
        items() {
            this.filteredItems = this.items;
        }
    },
    computed: {
        styleObject() {
            return {
                ...this.styleObj
            };
        },
        selectedText() {
            return this.selected
                .map(value => {
                    let selected = this.items.find(item => {
                        return item == value || item.value == value;
                    });
                    return selected && selected.text ? selected.text : selected;
                })
                .join(", ");
        }
    },
    methods: {
        onSelect(event, item) {
            if (this.toggleOnSelect) {
                this.onToggle();
            }
            if (this.selectType.toLowerCase() == "single" || this.selectType.toLowerCase() == "action") {
                this.selected = [item.value || item];
            } else {
                if (this.selected.includes(item.value || item)) {
                    this.selected = this.selected.filter(selected => selected != (item.value || item));
                } else {
                    this.selected.push(item.value || item);
                }
            }
            this.$emit("onSelect", this.selected);
        },
        onFilterChange(event) {
            this.itemToAdd = event.target.value.toLowerCase();

            const isStringArray = typeof this.items[0] === 'string';

            // Check if the itemToAdd matches any existing items
            const foundItem = this.items.find(item => (
                (isStringArray && item.toLowerCase() === this.itemToAdd) ||
                (!isStringArray && item.text.toLowerCase() === this.itemToAdd)
            ));

            if (this.itemToAdd) {
                // If itemToAdd doesn't match any existing items, add it as a new option
                this.showAddIcon = !foundItem;
                // If itemToAdd matches an existing item, filter the items based on the itemToAdd
                this.filteredItems = this.items.filter(item => (
                    (isStringArray && item.toLowerCase().includes(this.itemToAdd)) ||
                    (!isStringArray && item.text.toLowerCase().includes(this.itemToAdd))
                ));
            } else {
                // If itemToAdd is empty, show all items
                this.filteredItems = this.items;
                this.showAddIcon = false;
            }
        },
        onToggle() {
            if (this.toggle) {
                this.toggle = false;
                this.filteredItems = this.items;
            } else {
                this.toggle = true;
            }
            this.$emit("onToggle", this.toggle);
        },
        close() {
            this.filteredItems = this.items;
            this.toggle = false;
            this.itemToAdd = "";
            this.showAddIcon = false;
        },
        addItem() {
            const newItem = typeof this.items[0] === 'string'
            ? this.itemToAdd  // Array of Strings
            : { text: this.itemToAdd, value: this.itemToAdd.toLowerCase() };  // Array of Objects with 'text', 'value' properties
            this.items.push(newItem);
            this.itemToAdd = "";
            this.showAddIcon = false;
            this.$nextTick(() => {
                this.$refs.filterInputRef.value = "";
            });
            this.$emit("onAddItem", newItem);

        }
    }
};
</script>

<style scoped lang="scss">
.no-caret:after {
    content: none;
}
.btn {
    &.dropdown-toggle {
        position: relative;
        padding-right: 30px;
        &::after {
            position: absolute;
            right: 7px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
}
.hidden-field {
    opacity: 0;
    position: absolute;
    width: 1px !important;
}

.zek-dropdown {
    position: relative;

    &.with-filters {
        ::v-deep input.filter-string {
            background: #ffffff;
            border: none;
            padding: 10px;
            box-shadow: 0 0 10px #ccc;
            width: 100%;
            outline: none;
        }
        .dropdown-menu {
            border-radius: 0;
        }
    }
}
.field-error {
    font-size: 12px;
    color: #dc3545;
}
.zek-invalid-field > button {
    border: solid 2px #dc354550 !important;
}
.iconColor {
    color: blue;
}
.input-hint-icon {
  color: #999;
  cursor: pointer;
  height: 100%;
}
</style>
