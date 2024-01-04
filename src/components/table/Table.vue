<template>
    <div :class="'row' + customClass" @click="$emit('onClick', $event)">
        <ZekLoader :fullScreen="true" v-if="isLoading" />
        <div class="col" v-if="columns && columns.length">
            <b-table
                :items="tableData"
                v-bind="tableProps"
                :style="styleObj"
                :fields="fields"
                ref="bTable"
                @row-selected="rowSelected"
                @row-clicked="rowClick"
                :current-page="currentPage"
            >
                <template v-if="caption" #table-caption>{{ caption }}</template>
                <!-- Show row index -->
                <template v-if="showRowIndex" #cell(index)="data">
                    {{ data.index + 1 }}
                </template>
                <!-- Show select column with select header -->
                <template v-if="allowSelection" #head(selected)="">
                    <b-form-checkbox @change="toggleAllRows"></b-form-checkbox>
                </template>
                <template v-if="allowSelection" #cell(selected)="data">
                    <b-form-checkbox v-model="data.rowSelected" class="pe-none"></b-form-checkbox>
                    <!-- Delete Item Slot, TODO: What will this bind to in the generator? -->
                    <slot name="delete" @onClick="deleteData(data.item.id)"></slot>
                    <!-- Update Item -->
                    <slot name="update" @onClick="updateData(data.item.id)"></slot>
                </template>
                <!-- Show custom column content if component property exists-->
                <template #cell()="data">
                    <component
                        v-if="data.field.component"
                        :is="data.field.component"
                        :row="data.item"
                        @customEvent="emitTableEvent($event)"
                    ></component>
                    <span v-else> {{ data.value }}</span>
                </template>
                <!-- show delete button -->
                <template v-if="allowDelete || allowEdit" #cell(action_button)="data">
                    <ZekButton
                        v-if="allowDelete"
                        v-bind="deleteSettings.deleteButton"
                        @onClick="
                            deleteSettings.showConfirmation
                                ? showDeleteModal(data.item, data.index)
                                : deleteRow(data.item, data.index)
                        "
                    />
                    <ZekButton
                        v-if="allowEdit"
                        v-bind="editSettings.editButton"
                        @onClick="emitEdit(data.item, data.index)"
                    />
                </template>
            </b-table>
            <!-- Pagination -->
            <div v-if="pagination" class="align-items-right ">
                <p>Showing {{ start }} to {{ end }} of {{ tableData.length }} items</p>
                <b-pagination
                    v-model="currentPage"
                    :total-rows="tableData.length"
                    :per-page="pagination.itemsPerPage"
                    align="right"
                ></b-pagination>
            </div>
        </div>
        <div class="col table-placeholder" v-else-if="showSkeleton">
            <b-skeleton-table
                :rows="5"
                :columns="4"
                :table-props="{ bordered: true, striped: true }"
            ></b-skeleton-table>
        </div>
        <b-modal
            ref="delete-item"
            title="Are you sure you want to delete this item?"
            :ok-title="'Delete'"
            :hide-header-close="true"
            :header-class="'border-bottom-0 text-center p-5 pb-3'"
            :title-class="'fs-2'"
            :body-class="'d-none'"
            :footer-class="'border-top-0 align-items-center justify-content-center d-flex h-25'"
            :cancel-variant="'outline-secondary'"
            @ok="deleteRow"
        >
        </b-modal>
    </div>
</template>

<script>
// import Vue from 'vue'
// import { BootstrapVue } from 'bootstrap-vue'
// Vue.use(BootstrapVue)
import ZekButton from "../action-button/ActionButton.vue";
import ZekLoader from "../loader/Loader.vue";
import axios from "axios";
export default {
    name: "ZekTable",
    components: { ZekButton, ZekLoader },
    props: {
        columns: {
            //array of object of type {Label, dataField, styleObj}
            type: Array,
            default: () => []
        },
        headerType: {
            //light or dark,
            type: String,
            default: ""
        },
        type: {
            // one or multiple of: dark, hover, striped, bordered, borderless, sm
            type: [String, Array],
            default: ""
        },
        caption: {
            type: String,
            default: ""
        },
        data: {
            type: Array,
            default: () => []
        },
        showRowIndex: {
            type: Boolean,
            default: false
        },
        allowSelection: {
            type: Boolean,
            default: false
        },
        pagination: {
            //{itemsPerPage, currentPage}
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ""
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        dataSource: {
            type: [Array, String, Object],
            required: false
        },
        showSkeleton: {
            type: Boolean,
            default: false
        },
        mapping: {
            type: Object,
            required: false
        },
        allowDelete: {
            type: Boolean,
            default: false
        },
        deleteSettings: {
            type: Object,
            required: false,
            default: () => {
                return {
                    showConfirmation: true,
                    deleteButton: {
                        label: "",
                        icon: "fas fa-trash",
                        styleObj: {
                            color: "red",
                            background: "transparent",
                            border: "none"
                        }
                    }
                };
            }
        },
        allowEdit: {
            type: Boolean,
            default: false
        },
        editSettings: {
            type: Object,
            required: false,
            default: () => {
                return {
                    showConfirmation: true,
                    editButton: {
                        label: "",
                        icon: "fas fa-pencil-alt",
                        styleObj: {
                            color: "#2B91CD",
                            background: "transparent",
                            border: "none"
                        }
                    }
                };
            }
        },
        id: {
            type: [String, Number],
            default: ""
        }
    },
    data() {
        return {
            isLoading: false,
            fields: [],
            currentPage: 1,
            tableData: this.data || [],
            currentRow: null
        };
    },
    created() {
        this.processDataSource();
        if (this.pagination && this.pagination.currentPage) {
            this.currentPage = this.pagination.currentPage;
        }
        this.fields = this.columns
            ? this.columns.map(col => {
                  return {
                      key: col.dataField,
                      label: col.label,
                      sortable: col.sortable || false,
                      thStyle: col.styleObj,
                      tdClass: col.class,
                      component: col.component || null
                  };
              })
            : [];
        if (this.showRowIndex) {
            this.fields.unshift({
                label: "#",
                key: "index",
                sortable: false,
                isRowHeader: true
            });
        }
        if (this.allowSelection) {
            this.fields.unshift({
                key: "selected",
                sortable: false,
                isRowHeader: true
            });
        }
        if (this.allowDelete || this.allowEdit) {
            this.fields.push({
                key: "action_button",
                label: "Actions",
                sortable: false,
                isRowHeader: false
            });
        }
    },
    watch: {
        dataSource() {
            this.processDataSource();
        },
        data(val) {
            this.tableData = val;
        }
    },
    computed: {
        tableProps() {
            let tableClass = {};
            if (this.type && typeof this.type == "string") {
                tableClass[this.type] = true;
            } else if (this.type) {
                this.type.forEach(type => {
                    tableClass[type] = true;
                });
            }
            if (this.allowSelection) {
                tableClass["selectable"] = true;
            }
            if (this.pagination && this.pagination.itemsPerPage) {
                tableClass["per-page"] = this.pagination.itemsPerPage;
            }
            return tableClass;
        },
        start() {
            return this.pagination && this.pagination.itemsPerPage
                ? (this.currentPage - 1) * this.pagination.itemsPerPage + 1
                : 1;
        },
        end() {
            const end =
                this.pagination && this.pagination.itemsPerPage
                    ? this.start - 1 + this.pagination.itemsPerPage
                    : this.tableData.length;
            return end <= this.tableData.length ? end : this.tableData.length;
        }
    },
    methods: {
        rowSelected(rows) {
            this.$emit("rowsSelected", rows);
        },
        rowClick(row, index, event) {
            this.$emit("rowClick", {row, index, event});
        },
        toggleAllRows(selected) {
            if (selected) {
                this.$refs.bTable.selectAllRows();
            } else {
                this.$refs.bTable.clearSelected();
            }
        },
        emitTableEvent(data) {
            this.$emit("tableRowEvent", data);
        },
        showDeleteModal(row, index) {
            this.$emit("beforeDelete", { row, index });
            this.currentRow = row;
            this.$refs["delete-item"].show();
        },
        deleteRow(item, index) {
            this.$emit("deleteRow", { row: item, index });
            if (this.deleteSettings) {
                item.id ?? (item = this.currentRow);
                let deleteUrl = `${this.dataSource.url}${this.deleteSettings.url}=${item.id}`;
                // -----------------------------
                // TODO: Handle array of params
                // -----------------------------
                axios({
                    method: "DELETE",
                    url: deleteUrl,
                    headers: this.dataSource.headers
                })
                    .then(response => {
                        this.$emit("deleteSuccess", response.data.data);
                        this.processDataSource();
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        processDataSource() {
            if (this.dataSource) {
                if (typeof this.dataSource == "string") {
                    this.isLoading = true;
                    axios
                        .get(this.dataSource)
                        .then(response => {
                            this.mapDataSource(response.data.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.isLoading = false;
                        });
                } else if (typeof this.dataSource == "object") {
                    this.isLoading = true;
                    axios({
                        method: this.dataSource.method,
                        url: this.dataSource.url,
                        data: this.dataSource.requestBody,
                        headers: this.dataSource.headers
                    })
                        .then(response => {
                            this.mapDataSource(response.data.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                        .finally(() => {
                            this.isLoading = false;
                        });
                }
            }
        },
        mapDataSource(data) {
            if (this.mapping) {
                this.tableData = data.map(item => {
                    // TODO: Make sure the id will always be there or maybe given in the params or make go by index as well.
                    let mappedItem = {
                        id: item.id
                    };
                    for (let key in this.mapping) {
                        mappedItem[key] = item[this.mapping[key]];
                    }
                    return mappedItem;
                });
            } else {
                this.tableData = data;
            }
        },
        emitEdit(row, index) {
            this.$emit("editRow", { row, index });
        }
    }
};
</script>
