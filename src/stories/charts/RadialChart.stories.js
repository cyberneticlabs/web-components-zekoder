import ZekRadialChart from "../../components/charts/RadialChart.vue";
import { action } from '@storybook/addon-actions';
// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Zekoder/Charts/Radial Chart',
    component: ZekRadialChart,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {}
};

const Template = (args, { argTypes }) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ZekRadialChart: ZekRadialChart },
    props: Object.keys(argTypes),
    methods: { action },
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<zek-radial-chart @dataPointSelection="action(`selected`)()" v-bind="$props"></zek-radial-chart>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    height: "500px",
    width: "90%",
    styleObj: {
        border: "2px solid green"
    },
    id: '0',
    title: {
        text: 'My Fruit Chart',
        style: {
            color: 'rgb(255,0,0)',
            fontSize: '24px'
        }
    },
    data: [{
        color: '#ff0000',
        data: 30,
        dataKey: 'grapes',
        label: 'grapes'
    }, {
        color: '#cccccc',
        data: 40,
        dataKey: 'apples',
        label: 'apples'
    }],
    apiInfo: {
        url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
        method: 'get',
        type: 'http',
        query: ''
    },
    showLegend: true,
};