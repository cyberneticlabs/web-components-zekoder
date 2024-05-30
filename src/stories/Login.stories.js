import ZekLogin from "../components/login/Login.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Zekoder/Login',
    component: ZekLogin,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        theme: {
          control: 'select',
          options: ['material', 'bootstrap', 'custom']
        },

      },
  };


  const Template = (args, { argTypes }) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ZekLogin },
    props: Object.keys(argTypes),
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<zek-login v-bind="$props"></zek-login>',
  });

  export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
};
  export const WithRedirect = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
WithRedirect.args = {
  url: 'https://auth.dev.zekoder.net/login',
  redirectUrl: 'https://dev.zekoder.net/auth/verifysociallogin',
  callbackUrl: 'https://auth.dev.zekoder.net/login_callback',
};
