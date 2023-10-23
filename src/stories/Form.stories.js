import ZekForm from "../components/form/Form.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Zekoder/Form',
    component: ZekForm,
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
    components: { ZekForm },
    props: Object.keys(argTypes),
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<zek-form v-bind="$props"></zek-form>',
  });

  export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  heading: 'Form Heading', //for object it should be {text:String, headingLevel:String, styleObj:Object}
  subheading: {
      text:'Form sub heading',
      headingLevel:4,
      styleObj:{color:'red'}
  },
  description: 'Please provide all the details to the best of your knowledge', //for object {text: String, lineBreaks: Number, styleObj: Object}
  inputs: [
      {
          name: 'email',
          type: 'short-text',
          inputType: 'email',
          value: '',
          placeholder: 'Enter email',
          label: 'Email Address',
          required: true
      },
      {
        name: 'fname',
        type: 'short-text',
        value: '',
        placeholder: 'Enter first name',
        label: 'First Name',
        inputType: 'text',
        required: true
    },
    {
        name: 'lname',
        type: 'short-text',
        value: '',
        placeholder: 'Enter last name',
        label: 'Last Name',
        inputType: 'text'
    },
    {

        type: 'line',
        content: `<hr>`,
        styleObj: {
            color: "blue"
        }

    },
    {

        type: 'label',
        text: "blabla"

    },
    {
        name: 'lname',
        type: 'long-text',
        value: '',
        placeholder: 'Enter last name',
        label: 'Last Name',
    },
    {
        name: 'dd',
        type: 'dropdown',
        showIcon: true,
        items: ['A','B','C'],
        disabled: true,
        theme: 'Bootstrap',
        label: 'My dropdown'
    },
    {
        name: 'toggle',
        type: 'toggle-button',
        buttons: [
            {
                name:'fb',
                id: 'fb-0',
                class: "facebook-provider",
                label: "Facebook",
                style: {
                    width: "100px",
                    borderRadius: "10px",
                    background: "red"
                },
                icon: {
                    class: 'fab fa-facebook',
                    style: {
                        color: 'blue',
                        marginRight: '10px'
                    }
                }
            },
            {
                name:'google',
                id: 'goo-0',
                class: "google-provider",
                label: "",
                style: {
                    width: "100px",
                    borderRadius: "10px",
                    background: "blue"
                },
                disabled:true,
                image: {
                    src: "https://cdn.iconscout.com/icon/free/png-256/google-2981831-2476479.png",
                    width: "50px"
                },
                label: "google"
            },
            {
                name:'tw',
                id: 'tw-0',
                class: "twitter-provider",
                label: "Twitter",
                style: {
                    width: "100px",
                    borderRadius: "10px",
                    border: "2px solid green"
                },
                active: true,
                icon: {
                    class: 'fab fa-twitter',
                    style: {
                        color: 'blue',
                        marginLeft: '10px'
                    }
                },
                textPosition: "left"
            },
        ]

    }
  ],
  submitButton: 'Proceed', //for string it is button label, for object it should be {show:true, label:'Submit', styleObj: {}}
  cancelButton: {
      label: "Discard",
      styleObj: {color: 'black'}
  },
  theme: 'bootstrap',
  errorMessage: '',
  successMessage: '',
  styleObj: {
    "textTransform": "capitalize",
    "textAlign": "center"
  }
};
