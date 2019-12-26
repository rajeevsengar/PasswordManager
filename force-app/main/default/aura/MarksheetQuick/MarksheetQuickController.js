({
    doInit: function (component, event, helper) {
        var width = 70;
        component.set('v.columns', [{
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

        ]);

        component.set('v.columns0', [{
            label: 'Student',
            fieldName: 'Student__c',
            type: 'text',
            initialWidth: width + 25,
        },
        {
            label: 'Sub',
            fieldName: 'Subjects__c',
            type: 'text',
            initialWidth: width,

        },
        ]);
        helper.dynamicCreate(component);
    },

    handleAddSubject: function (component, event, helper) {
        helper.validateAndAdd(component);
    },

    handleSave: function (component, event, helper) {
        helper.saveRecords(component);
        helper.toggleShowData(component);
    },

    showData: function (component, event, helper) {
        helper.toggleShowData(component);
    },
    handleRowAction: function (component, event, helper) {
        var rowString = JSON.stringify(event.getParam('row'));
        component.set('v.rowrecord', JSON.parse(rowString));
        component.set('v.inlineedit', true);
    },
    handleInlineSave: function (component, event, helper) {
        var row = component.get('v.rowrecord');
        helper.inlineSave(component, row);
    }


})