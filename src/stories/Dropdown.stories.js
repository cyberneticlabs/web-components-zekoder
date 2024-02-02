import Dropdown from '../components/dropdown/Dropdown.vue';
import { action } from "@storybook/addon-actions"

export default {
    title: 'Zekoder/Dropdown',
    component: Dropdown,
    argTypes: {
        showSeleceted: {
            control: { type: 'boolean' },
        },
        showCheckBox: {
            control: { type: 'boolean' },
        },
        label: {
            control: { type: 'text' },
        },
        items: {
            control: { type: 'object' },
        },
        selectType: {
            control: { type: 'select' },
            options: ['Single', 'Multi', 'action'],
        },
        theme: {
            control: { type: 'select' },
            options: ['Material', 'Bootstrap', 'Custom'],
        },
        showIcon: {
            control: { type: 'boolean' },
        },
        styleObj: {
            control: { type: 'object' },
        },
        listStyle: {
            control: { type: 'object' },
        },
        itemStyle: {
            control: { type: 'object' },
        },
        selectedItemStyle: {
            control: { type: 'object' },
        },
        iconStyle: {
            control: { type: 'object' },
        },
        toggleOnSelect: {
            control: { type: 'boolean' },
        }
    },
};

const Template = (args, { argTypes }) => ({
    components: { 'zek-dropdown': Dropdown },
    props: Object.keys(argTypes),
    methods: { action },
    template: `<zek-dropdown @onToggle="action('Toggled')($event)" @onSelect="action('Selected')($event)" @onAddItem="action('Added')($event)" v-bind="$props"></zek-dropdown>`,
});

export const Primary = Template.bind({});
Primary.args = {
    showSelected: true,
    showCheckBox: true,
    label: 'Dropdown',
    items: [
        //  "1", "2", "3"
        {
        text: '1',
        value: "1d",
        icon: 'far fa-thumbs-up iconColor'
        },
        {
        text: '2',
        value: "2d",
        icon: 'far fa-thumbs-up iconColor'
        },
        {
        text: '3',
        value: "3d",
        icon: 'far fa-thumbs-up iconColor'
        },
    ],
    selectType: 'Single',
    theme: 'Bootstrap',
    showIcon: true,
    styleObj: {
        height: 'fit-content',
        width: '100%',
    },
    buttonStyle: {
        backgroundColor: 'lightgrey',
        borderRadius: '5px',
        outline: 'none',
        border: 'none',
        width: '100%',
    },
    // itemStyle: {
    //     backgroundColor: '#ffff',
    // },
    // selectedItemStyle: {
    //     backgroundColor: '#f5f5f5',
    // },
    iconStyle: {
    },
    toggleOnSelect: true,

};

export const Secondary = Template.bind({});
Secondary.args = {};
