<template>
    <header ref="zekHeader" id="zek-header" class="zek-header-wrapper" :style="styleObj" :class="customClass">
        <i
            v-if="sidebarButton"
            class="fa fa-bars sidebar"
        />
        <a
            v-if="logo"
            :href="logo.url ? logo.url : 'javascript:void(0)'"
            class="logo"
            :style="{ cursor: logo.url ? 'pointer' : 'default', ...logo.style }"
        >
            <img :src="logo.src" :style="logo.logoStyle" />
            <span v-if="logo.logoText" class="zek-logo-text-container">
                <span class="logo-main-text" :class="logo.logoText.mainTextClass" :style="logo.logoText.mainTextStyleObj">
                    {{ logo.logoText.mainText }}
                </span>
                <span v-if="logo.logoText.subText" class="logo-sub-text" :class="logo.logoText.subTextClass" :style="logo.logoText.subTextStyleObj">
                    {{ logo.logoText.subText }}
                </span>
            </span>
        </a>
        <div class="zek-header-menu" v-if="menus && menus.length">
            <div
                class="zek-header-menu-item"
                v-for="(menu, i) in menus"
                :key="i"
            >
                <zek-dropdown
                    v-if="menu.links && menu.links.length"
                    :label="menu.label"
                    :theme="`Custom`"
                    :items="menu.links"
                    :selectType="`Single`"
                    @select="onSelect"
                    v-bind="menu.dropdownProps || dropdownProps"
                />
                <RouterLink v-else :to="menu.url">{{menu.label}}</RouterLink>
            </div>
        </div>
        <ZekDropdown v-if="langDropdown" v-bind="langDropdown.props" v-on="langDropdown.events" />
        <ZekUserInfo v-if="userInfo" v-bind="userInfo.props" v-on="userInfo.events"/>
    </header>
</template>

<script>
import ZekDropdown from "../dropdown/Dropdown.vue";
import ZekUserInfo from "../user-info-component/UserInfo.vue";
export default {
    name: "ZekHeader",
    components: {
        ZekDropdown,
        ZekUserInfo
    },
    props: {
        logo: {
            type: Object,
            default: () => ({
                position: "left",
                url: "",
                style: {
                    width: "50px",
                    height: "50px",
                    textDecoration: "none"
                },
                logoStyle: {
                    width: "70%"
                },
                textStyle: {
                    fontWeight: "bold",
                    color: "black"
                }
            })
        },
        text: {
            type: String, Object,
            default: ""
        },
        sidebarButton: {
            type: Boolean,
            default: false
        },
        sidebarButtonProperties: {
            type: Object,
            default: () => ({
                position: "right",
                target: ""
            })
        },
        menus: {
            type: Array,
            default: () => []
        },
        styleObj: {
            type: Object,
            default: () => ({})
        },
        dropdownProps: {
            type: Object,
            default: () => ({
                listStyle: {
                    position: "absolute",
                    background: "white",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 5px #ccc",
                    zIndex: "1",
                    padding: "10px",
                    margin: "0"
                },
                buttonStyle: {
                    color: "black"
                },
                iconStyle: {
                    position: "relative",
                    marginLeft: "10px"
                }
            })
        },
        userInfo: {
            type: Object,
            default: () => ({})
        },
        langDropdown: {
            type: Object,
            default: () => ({})
        },
        customClass: {
            type: String,
            default: ""
        },
        id: {
            type: [String, Number],
            default: ""
        },
    },
    methods: {
        onSelect(selected) {
            console.log(selected);
            window.location.href = selected;
        }
    }
};
</script>
<style scoped lang="scss">
.zek-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 0 10px;
}
.zek-header-menu {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 100%;
}
.sidebar {
    cursor: pointer;
    padding: 0 10px;
}
</style>
