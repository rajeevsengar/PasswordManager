({
    init: function (component, event, helper) {
        helper.getAllPasswords(component);
    },

    onSave: function (component, event, helper) {
        helper.saveAllPasswords(component);
    },

    handlePageRefreshEvent: function (component, event, helper) {
        helper.getAllPasswords(component);
    },
})