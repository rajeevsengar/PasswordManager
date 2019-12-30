({
    init: function (component, event, helper) {
        helper.getWebsiteOptions(component);

    },

    handleChange: function (component, event, helper) {
        helper.getWebsiteOptions(component);
    },

    onSave: function (component, event, helper) {
        helper.handlePasswordSave(component, event);
    },

    onClear: function (component, event, helper) {
        helper.clearForm(component);
    },

    copyUsername: function (component, event, helper) {
        var textForCopy = component.find('Username__c').get("v.value");
        // calling common helper class to copy selected text value
        helper.copyTextHelper(component, event, textForCopy);
    },

    copyPassword: function (component, event, helper) {
        var textForCopy = component.find('Password__c').get("v.value");
        // calling common helper class to copy selected text value
        helper.copyTextHelper(component, event, textForCopy);
    },

    onCopy: function (component, event, helper) {
        var textForCopy = JSON.stringify(component.get("v.newPassword"));
        helper.copyTextHelper(component, event, textForCopy);
    },

    showPassword: function (component) {
        var showed = component.get("v.show");
        component.set("v.show", !showed);
        if (component.get("v.passwordType") == "Password") {
            component.set("v.passwordType", "Text");
        } else {
            component.set("v.passwordType", "Password");
        }
    },

    openURL: function (component, event, helper) {
        window.open(component.find('URL__c').get("v.value"));
    },

    onDelete: function (component, event, helper) {
        helper.handlePassworddelete(component, event);
    },

})