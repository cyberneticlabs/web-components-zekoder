<template>
    <div>
        <b-breadcrumb
            :class="customClass"
            :style="styleObj"
            active-class="active"
            :id="id"
            v-bind="extraProps"
            ref="zekBreadcrumb"
            :items="items"
            @click="navigate($event)"
        ></b-breadcrumb>
    </div>
</template>

<script>
export default {
    name: "ZekBreadcrumb",
    props: {
        items: {
            type: Array,
            default: () => [
                {
                    text: "Admin",
                    href: "#",
                    active: false
                },
                {
                    text: "Manage",
                    to: { name: "" }
                },
                {
                    text: "Library",
                    active: true
                }
            ]
        },
        id: {
            type: String,
            default: ""
        },
        extraProps: {
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
        // divider: {
        //     type: String,
        //     default: "/"
        // },
        addRoute: {
            type: [String, Object],
            default: ""
        }
    },
    data() {
        return {
            divider: "-"
        };
    },
    methods: {
        navigate(event) {
            let clickedText = "";
            if (this.addRoute) {
                const routeText = typeof this.addRoute === "string" ? this.addRoute : this.addRoute.text;
                const routeExists = this.items.some(item => item.text === routeText);
                if (routeExists) {
                    // Set the existing route as active
                    this.items.forEach(item => {
                        if (item.text === routeText) {
                            item.active = true;
                        } else {
                            item.active = false;
                        }
                    });
                } else {
                    // Add the new route to items
                    const newItem =
                        typeof this.addRoute === "string"
                            ? { text: this.addRoute, to: {name: this.addRoute.toLowerCase() }, active: true}
                            : { ...this.addRoute };
                    this.items.push(newItem);
                }
            } else {
                clickedText = event.target.text;
                this.items.forEach(item => {
                    if (item.text === clickedText) {
                        item.active = true;
                    } else {
                        item.active = false;
                    }
                });
            }
            const index = this.items.findIndex(item => item.text === clickedText);
            if (index === this.items.length - 2) {
                // Remove the last item from the items array
                this.items.pop();
            }
        }
    }
};
</script>

<style lang="scss" scoped>

.active {
    color: v-bind(divider);
}
::v-deep .breadcrumb-item + .breadcrumb-item::before {
    --bs-breadcrumb-divider: v-bind(divider);
    content: var(--bs-breadcrumb-divider, "/") !important;
}
</style>
