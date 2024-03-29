import ZekCard from "../components/card/Card.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Zekoder/Card',
    component: ZekCard,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        flipOn: {
            control: { type: "select" },
            options: [ 'click', 'hover' ]
        },
        backgroundColor: {
            control: 'color'
        },
        hoverBackgroundColor: {
            control: 'color'
        }
    },
};


const Template = (args, {argTypes}) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ZekCard },
    props: Object.keys(argTypes),
    template: '<zek-card v-bind="$props"></zek-card>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    backgroundColor: '#ffffe',
    hoverBackgroundColor: '',
    content: { //Content must have rows, rows must have columns, columns can have more rows. Component can only be inside a column
        rows: [
            {
                columns: [
                    {
                        columnWidth: 6, // 1-12
                        content: {
                            component: 'image',
                            data: {
                                url: "https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=20&m=535695503&s=612x612&w=0&h=S16wHXc-b3AkL7YMrcFkR2pDGFJA1bRsPmAfQlfrwkc=",
                                width: "200px",
                                height: "200px",
                            }
                        }
                    },
                    {
                        columnWidth: 6,
                        rows: [
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'heading',
                                            data: {
                                                headingLevel: 2,
                                                text: 'My card heading'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'heading',
                                            data: {
                                                headingLevel: 3,
                                                text: 'My subheading'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'text',
                                            data: {
                                                lineBreak: 2,
                                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus lacus eget ligula feugiat, finibus convallis felis imperdiet.'
                                            },
                                            map: 'name'
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'list',
                                            data: {
                                                type: 'unordered',
                                                listItems: ['Bullet point 1', 'Bullet point 2', 'Bullet point 3']
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ],

            }
        ]
    },
    flipContent: { //Content must have rows, rows must have columns, columns can have more rows. Component can only be inside a column
        rows: [
            {
                columns: [
                    {
                        columnWidth: 6, // 1-12
                        content: {
                            component: 'image',
                            data: {
                                url: "https://remoto.world/_nuxt/img/companies.694de85.svg",
                                width: "200px",
                                height: "200px",
                            }
                        }
                    },
                    {
                        columnWidth: 6,
                        rows: [
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'heading',
                                            data: {
                                                headingLevel: 2,
                                                text: 'My FLIP heading'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'text',
                                            data: {
                                                lineBreak: 2,
                                                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis rhoncus lacus eget ligula feugiat, finibus convallis felis imperdiet. Fusce diam dolor, dapibus at nulla ut, ultricies tincidunt est. Maecenas sed malesuada eros, quis hendrerit arcu. Donec vehicula sem leo'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'button',
                                            data: {
                                                label: 'Call to action',
                                                theme: 'bootstrap'
                                            },
                                            events: {
                                                onClick() {
                                                    console.log('I have been clicked')
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }

                ],

            }
        ]
    },
    flipOn: 'click',
    styleObj: {
        border: 'solid 1px #1abc9c'
    },
    dataSource: {
        url: "https://zekoder-zestudio-dev-25ahf2meja-uc.a.run.app/environments",
        method: "POST",
        requestBody: {
            project: ["name", "description", "created_on", "updated_on", "cloud_provider", "kind"],
        },
        headers: {
            Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJaZUF1dGgiLCJleHByIjoxNjczOTUxOTg1LCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldi56ZWtvZGVyLm5ldCIsInN1YiI6ImEwNDJmMDEyLTkzM2QtMTFlZC05ZTIxLWFiY2FkNzI5ZDJmNiIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwidmVyaWZpZWQiOnRydWUsInVzZXJfc3RhdHVzIjp0cnVlLCJhdmF0YXJfdXJsIjoiIiwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoidGVzdCIsImZ1bGxfbmFtZSI6ImFkbWluIHRlc3QiLCJyb2xlcyI6W10sImdyb3VwcyI6W10sImNyZWF0ZWRfYXQiOjE2NzM2MTI4NDAsImxhc3RfbG9naW5fYXQiOjE2NzM5NDgzODUsImxhc3RfdXBkYXRlX2F0IjoxNjczOTQ4Mzg1fQ.D7mswLf-CHUD0GFh2VUXhPYJEuMwJVQx9aUmVWStzzY',
        },
    },
};
