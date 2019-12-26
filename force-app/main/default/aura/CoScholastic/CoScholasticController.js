({
    doInit: function (component, event, helper) {
        var width = 90;
        component.set('v.columns0', [{
            label: 'Student',
            fieldName: 'Student__c',
            type: 'text',
            initialWidth: width,
        },]);
        component.set('v.columnscoscholastic', [
            {
                label: 'Work Edu.',
                fieldName: 'Work_Education__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Art Edu.',
                fieldName: 'Art_Education__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Health&PE',
                fieldName: 'Health_PE__c',
                type: 'text',
                initialWidth: width + 10,

            },
            {
                label: 'Discipline',
                fieldName: 'Discipline1__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'GK',
                fieldName: 'GK__c',
                type: 'text',
                initialWidth: width - 10,

            },
            {
                label: 'Value Edu.',
                fieldName: 'Value_Education__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Scout&Guide',
                fieldName: 'Scout_Guide__c',
                type: 'text',
                initialWidth: width + 20,

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
        component.set('v.columnsattendance', [
            {
                label: 'Working Days',
                fieldName: 'Working_Days__c',
                type: 'text',
                initialWidth: width + 20,

            },
            {
                label: 'Present',
                fieldName: 'Present__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Absent',
                fieldName: 'Absent__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Late',
                fieldName: 'Late__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Leave',
                fieldName: 'Leave__c',
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
        component.set('v.columnshealth', [
            {
                label: 'Height',
                fieldName: 'Height__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'Weight',
                fieldName: 'Weight__c',
                type: 'text',
                initialWidth: width,

            },
            {
                label: 'BG',
                fieldName: 'BG__c',
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

    },
    handleAddRecord: function (component, event, helper) {
        helper.addMore(component);
        component.set("v.showtable", !component.get("v.showtable"));
        component.set("v.showtable", !component.get("v.showtable"));
    },

    handleShowData: function (component, event, helper) {
        helper.toggleShowData(component);
    },
    handleSaveRecords: function (component, event, helper) {
        helper.saveRecords(component);
        helper.toggleShowData(component);
    },
    handleInlineSave: function (component, event, helper) {
        var row = component.get('v.rowrecord');
        helper.inlineSave(component, row);
    },
    handleRowAction: function (component, event, helper) {
        var rowString = JSON.stringify(event.getParam('row'));
        component.set('v.rowrecord', JSON.parse(rowString));
        component.set('v.inlineedit', true);
    },

})