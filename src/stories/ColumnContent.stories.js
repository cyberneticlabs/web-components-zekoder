import ZekColumnContent from '../components/column-content/ColumnContent.vue';

export default {
    title: 'Zekoder/Column Content',
    component: ZekColumnContent,
};

const Template = (args, { argTypes }) => ({
    components: { ZekColumnContent },
    props: Object.keys(argTypes),
    template: '<ZekColumnContent v-bind="$props"/>',
});

export const Column = Template.bind({});
Column.args = {
    column: {
        columnWidth: 12,
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
        content: {
            component: 'text',
            data: {
                text: 'This is a text component'
            },
            dataField: 'name'
        }
    }
};

export const Row = Template.bind({});
Row.args = {
    column: {
        rows: [
            {
                dataSource: {
                    url: "https://zekoder-zestudio-dev-25ahf2meja-uc.a.run.app/environments",
                    method: "POST",
                    requestBody: {
                        project: ["name", "description", "created_on", "updated_on", "cloud_provider", "kind"],
                    },
                    headers: {
                        Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJaZUF1dGgiLCJleHByIjoxNjczOTUxOTg1LCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldi56ZWtvZGVyLm5ldCIsInN1YiI6ImEwNDJmMDEyLTkzM2QtMTFlZC05ZTIxLWFiY2FkNzI5ZDJmNiIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwidmVyaWZpZWQiOnRydWUsInVzZXJfc3RhdHVzIjp0cnVlLCJhdmF0YXJfdXJsIjoiIiwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoidGVzdCIsImZ1bGxfbmFtZSI6ImFkbWluIHRlc3QiLCJyb2xlcyI6W10sImdyb3VwcyI6W10sImNyZWF0ZWRfYXQiOjE2NzM2MTI4NDAsImxhc3RfbG9naW5fYXQiOjE2NzM5NDgzODUsImxhc3RfdXBkYXRlX2F0IjoxNjczOTQ4Mzg1fQ.D7mswLf-CHUD0GFh2VUXhPYJEuMwJVQx9aUmVWStzzY',
                    },
                    iter: 'row',
                },
                columns: [
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: 'This is a text component',
                            },
                            dataField: 'description'
                        }
                    },
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: 'This is a text component'
                            },
                            dataField: 'id'
                        }
                    },
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: 'This is a text component'
                            },
                            dataField: 'name'
                        }
                    },
                ]
            }
        ]
    }
};

export const ColumnArray = Template.bind({});
ColumnArray.args = {
    column: {
        columnWidth: 12,
        dataSource: {
            url: "https://zekoder-zestudio-dev-25ahf2meja-uc.a.run.app/environments",
            method: "POST",
            requestBody: {
                project: ["name", "description", "created_on", "updated_on", "cloud_provider", "kind"],
            },
            headers: {
                Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJaZUF1dGgiLCJleHByIjoxNjczOTUxOTg1LCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldi56ZWtvZGVyLm5ldCIsInN1YiI6ImEwNDJmMDEyLTkzM2QtMTFlZC05ZTIxLWFiY2FkNzI5ZDJmNiIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwidmVyaWZpZWQiOnRydWUsInVzZXJfc3RhdHVzIjp0cnVlLCJhdmF0YXJfdXJsIjoiIiwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoidGVzdCIsImZ1bGxfbmFtZSI6ImFkbWluIHRlc3QiLCJyb2xlcyI6W10sImdyb3VwcyI6W10sImNyZWF0ZWRfYXQiOjE2NzM2MTI4NDAsImxhc3RfbG9naW5fYXQiOjE2NzM5NDgzODUsImxhc3RfdXBkYXRlX2F0IjoxNjczOTQ4Mzg1fQ.D7mswLf-CHUD0GFh2VUXhPYJEuMwJVQx9aUmVWStzzY',
            },
            iter: 'column'
        },
        content: [
            {
                component: 'text',
                data: {
                    text: 'This is a text component'
                },
                dataField: 'name'
            },
            {
                component: 'text',
                data: {
                    text: 'This is a text component'
                },
                dataField: 'description'
            },
            {
                component: 'text',
                data: {
                    text: 'This is a text component'
                },
                dataField: 'created_on'
            },
        ]
    }
};
export const ParentRow = Template.bind({});
ParentRow.args = {
    column: {
        columnWidth: 12,
        dataSource: {
            url: "https://zekoder-zestudio-dev-25ahf2meja-uc.a.run.app/environments",
            method: "POST",
            requestBody: {
                project: ["name", "description", "created_on", "updated_on", "cloud_provider", "kind"],
            },
            headers: {
                Authorization: "Bearer " + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJaZUF1dGgiLCJleHByIjoxNjczOTUxOTg1LCJpc3MiOiJodHRwczovL2FjY291bnRzLmRldi56ZWtvZGVyLm5ldCIsInN1YiI6ImEwNDJmMDEyLTkzM2QtMTFlZC05ZTIxLWFiY2FkNzI5ZDJmNiIsImVtYWlsIjoiYWRtaW5AdGVzdC5jb20iLCJ1c2VybmFtZSI6ImFkbWluQHRlc3QuY29tIiwidmVyaWZpZWQiOnRydWUsInVzZXJfc3RhdHVzIjp0cnVlLCJhdmF0YXJfdXJsIjoiIiwiZmlyc3RfbmFtZSI6ImFkbWluIiwibGFzdF9uYW1lIjoidGVzdCIsImZ1bGxfbmFtZSI6ImFkbWluIHRlc3QiLCJyb2xlcyI6W10sImdyb3VwcyI6W10sImNyZWF0ZWRfYXQiOjE2NzM2MTI4NDAsImxhc3RfbG9naW5fYXQiOjE2NzM5NDgzODUsImxhc3RfdXBkYXRlX2F0IjoxNjczOTQ4Mzg1fQ.D7mswLf-CHUD0GFh2VUXhPYJEuMwJVQx9aUmVWStzzY',
            },
            iter: 'column'
        },
        rows: [
            {
                columns: [
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: 'This is a text component',
                            },
                            dataField: 'description'
                        }
                    },
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: 'This is a text component'
                            },
                            dataField: 'id'
                        }
                    },
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: 'This is a text component'
                            },
                            dataField: 'name'
                        }
                    },
                ]
            }
        ]
    }
};
export const Complex = Template.bind({});
Complex.args = {
    column: {
        rows: [
            {
                columns: [
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: '1',
                            },
                            dataField: 'description'
                        }
                    },
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: '2'
                            },
                            dataField: 'id'
                        }
                    },
                    {
                        columnWidth: 12,
                        content: {
                            component: 'text',
                            data: {
                                text: '3'
                            },
                            dataField: 'name'
                        }
                    },
                    {
                        columnWidth: 12,
                        rows: [
                            {
                                    columns: [
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'text',
                                            data: {
                                                text: '1N'
                                            },
                                        }
                                    },
                                    {
                                        columnWidth: 12,
                                        content: {
                                            component: 'text',
                                            data: {
                                                text: '2N'
                                            },
                                        }
                                    },
                                    {
                                        columnWidth: 12,
                                        rows: [{
                                            columns: [
                                                {
                                                    columnWidth: 12,
                                                    content: {
                                                        component: 'text',
                                                        data: {
                                                            text: '1NN'
                                                        },
                                                    }
                                                },
                                                {
                                                    columnWidth: 12,
                                                    content: {
                                                        component: 'text',
                                                        data: {
                                                            text: '2NN'
                                                        },
                                                    }
                                                },
                                            ]
                                        }]
                                    },
                                ]
                            }
                        ]
                    },
                ]
            }
        ]
    }
};