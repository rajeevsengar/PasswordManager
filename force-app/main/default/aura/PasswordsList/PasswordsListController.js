({
    init: function (component, event, helper) {
        helper.getAllPasswords(component);
    },

    onSave: function (component, event, helper) {
        console.log(component.get("v.passwordsList"));
        helper.saveAllPasswords(component);
    },
})