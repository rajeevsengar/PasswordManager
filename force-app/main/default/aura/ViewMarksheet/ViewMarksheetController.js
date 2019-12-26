({
    init: function (component, event, helper) {
        var width = 70;
        component.set('v.columns', [{
                label: 'Sub',
                fieldName: 'Subjects__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'PT1',
                fieldName: 'PT1__c',
                type: 'number',
                initialWidth: width,

            },
            {
                label: 'NB',
                fieldName: 'Notebook__c',
                type: 'number',
                initialWidth: width,

            },
            {
                label: 'Sub.Enr',
                fieldName: 'Sub_Enrichment_5__c',
                type: 'number',
                initialWidth: width,

            },
            {
                label: 'Half Yealry',
                fieldName: 'Half_Yealry_80__c',
                type: 'number',
                initialWidth: width + 10,

            },
            {
                label: 'Marks',
                fieldName: 'Marks_Obt_100__c',
                type: 'number',
                initialWidth: width,

            },
            {
                label: 'Grade',
                fieldName: 'Grade__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Edit',
                type: 'button',
                initialWidth: 100,
                typeAttributes: {
                    label: 'Edit',
                    name: 'edit_details',
                    title: 'Click to edit Details'
                }
            },
            {
                label: 'Delete',
                type: 'button',
                initialWidth: 100,
                typeAttributes: {
                    label: 'Delete',
                    name: 'delete_details',
                    title: 'Click to delete Details'
                }
            },
        ]);
        helper.getAllRecords(component);
    },
    handleChange: function (component, event) {
        var selectedOptionValue = event.getParam("value");
        component.set('v.data', component.get('v.records')[selectedOptionValue]);
        if (selectedOptionValue) {
            component.set("v.showtable", true);
        } else {
            component.set("v.showtable", false);
        }
    },
    handleRowAction: function (component, event, helper) {
        var action = event.getParam('action');
        var row = event.getParam('row');
        switch (action.name) {
            case 'delete_details':
                if (confirm("Are You Sure You Want To Delete?")) {
                    helper.deleteDetails(component, row);
                }
                break;
            case 'edit_details':
                var rowString = JSON.stringify(event.getParam('row'));
                component.set('v.rowrecord', JSON.parse(rowString));
                component.set('v.inlineedit', true);
                break;
        }

    },
    handleInlineSave: function (component, event, helper) {
        var row = component.get('v.rowrecord');
        helper.inlineSave(component, row);
    },

    handleSave: function (component, event, helper) {
        helper.saveRecords(component);
    },
})