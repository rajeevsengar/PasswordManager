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
    },

    handleHeaderSave: function (component, event, helper) {
        var passwordsList = component.find('PasswordsListid');
        passwordsList[0].headerSaveClickedMethod();
    },
})