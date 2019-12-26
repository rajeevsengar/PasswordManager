({
    init: function (component, event, helper) {

        var selectedComponent = 'PasswordsList';
        var selectedLabel = 'Passwords';

        component.set("v.selectedComponent", selectedComponent);
        component.set("v.selectedLabel", selectedLabel);
        helper.createCmp(component);
    },

    handleChangeItem: function (component, event, helper) {
        helper.createCmp(component);
    }
})