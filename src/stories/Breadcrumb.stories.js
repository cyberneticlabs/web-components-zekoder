import ZekBreadcrumb from '../components/breadcrumb/Breadcrumb.vue'

export default {
    title: 'Zekoder/Breadcrumb',
    component: ZekBreadcrumb,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
    },
  };

  const Template = (args, {argTypes}) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ZekBreadcrumb },
    props: Object.keys(argTypes),
    template: '<zek-breadcrumb v-bind="$props"></zek-breadcrumb>',
  });

  export const breadcrumb = Template.bind({});
  breadcrumb.args = {
    items: [
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
    ],
    addRoute: {
        text: "blabla",
            to: { name: "" }
    }

  }
