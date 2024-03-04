import ZekTable from "../components/table/Table.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
    title: 'Zekoder/Table',
    component: ZekTable,
    // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
    argTypes: {
        headerType: {
          control: 'select',
          options: ['light', 'dark'],
        },
        type: {
          control: 'multi-select' ,
          options: ['dark', 'striped', 'hover', 'bordered', 'small', 'borderless']
        }

      },
  };


  const Template = (args, { argTypes }) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { ZekTable },
    props: Object.keys(argTypes),
    // And then the `args` are bound to your component with `v-bind="args"`
    template: '<zek-table v-bind="$props" @rowsSelected="logSelection($event)" @onChange="pageNumber($event)"></zek-table>',
    methods: {
        logSelection(sel){
            console.log(sel);
        },
        pageNumber(val) {
            console.log(val)
        }
    }
  });

  export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
    columns: [
        {
            label: "Created On",
            dataField: "created_on",
            styleObj: {
                width: "150px",
            },
        },
        {
            label: "Name",
            dataField: "name",
            styleObj: {
                width: "150px",
            },
        },
        {
            label: "Kind",
            dataField: "kind",
            sortable: true,
            styleObj: {},
        },
        {
            label: "Cloud Provider",
            dataField: "cloud_provider",
            sortable: true,
            styleObj: {},
        },
    ], //array of object of type {Label, dataField, styleObj}
    headerType: 'light', //light or dark,
    type: ['dark', 'hover', 'striped'], // one or multiple of: dark, hover, striped, bordered, borderless, small
    caption: 'user info table',
    data: [
        {
            lauthor: 'John Doe',
            ldate: '2020-01-01',
            lsource: 'https://www.google.com'
        },
        {
            lauthor: 'Jane Doe',
            ldate: '2020-01-01',
            lsource: 'https://www.google.com'
        },
    ],
    showRowIndex: false,
    allowSelection: true,
    pagination: {
        itemsPerPage: 2
    },
    styleObj: {
        "textTransform": "capitalize",
        "textAlign": "center",
        "width": "100%"
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
    allowDelete: true,
    deleteSettings: {
        url: '/environment_id?environment_id',
        deleteParams: 'environment_id',
        showConfirmation: true,
        deleteButton: {
            label: '',
            icon: 'fa fa-trash',
            styleObj: {
                color: 'red',
                fontSize: '20px',
            },
        }

    },
};
