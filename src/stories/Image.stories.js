import ZekImage from "../components/image/Image.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export

export default {
    title: "Zekoder/Image",
    component: ZekImage,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        url: {
            control: "text",
        },
        altText: {
            control: "text",
        },
        width: {
            control: "text",
        },
        height: {
            control: "text",
        },
        targetUrl: {
            control: "text",
        },
        targetWindow: {
            control: { type: "select" },
            options: [ 'self', 'blank' ],
        },
        imageColor: {
            control: { type: "select" },
            options: [ 'normal', 'grayscale' ],
        }
    },
};

const Template = (args,{argTypes}) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ZekImage },
    props: Object.keys(argTypes),
    template: '<ZekImage v-bind="$props"></ZekImage>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    url: "https://remoto.world/_nuxt/img/companies.694de85.svg",
    altText: "sample image",
    width: "200px",
    height: "200px",
    targetUrl: "",
    targetWindow: '_self',
    imageColor: 'normal',
    hover: {
        action: 'text', // grayscale, normal, text, picture
        alternatePicture: 'https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=20&m=535695503&s=612x612&w=0&h=S16wHXc-b3AkL7YMrcFkR2pDGFJA1bRsPmAfQlfrwkc=',
        textOverlay: {
            text: "Overlay text on image",
            styleObj: {
                color: "red"
            }
        }
    },
    crop: {
        type: 'round', // round, rectangle,
        position: 'left', // 'left', 'right', 'bottom', 'top', 'center', or a pair of these e.g. 'left top', 'right bottom'
        top: '', // pixel
        left: '', // pixel
        bottom: '', // pixel
        right: '', // pixel
    },
    styleObj: {
        color: "red",
        fontSize: "24px",
        textTransform: "capitalize",
        textDecoration: "underline",
    },
};

export const Secure = Template.bind({});
Secure.args = {
    url: "https://files.dev.zekoder.net/asset/e5b13400-608d-11ef-80c8-d7745ee42276",
    secure: true,
    width: "200px",
    // accessToken: "Bearer " + localStorage.getItem("accessToken") // Custom token
}
