({
    init: function (component, event, helper) {
        component.set("v.resetPassword", JSON.parse(JSON.stringify(component.get("v.newPassword"))));
        helper.getWebsiteOptions(component);
    },

    handleCategoryChange: function (component, event, helper) {
        helper.getWebsiteOptions(component);
    },

    handleWebsiteChange: function (component, event, helper) {
        helper.getWebsiteLabel(component, event);
    },

    onSave: function (component, event, helper) {
        helper.handlePasswordSave(component, event);
    },

    onReset: function (component) {
        component.set("v.newPassword", JSON.parse(JSON.stringify(component.get("v.resetPassword"))));
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

    openURL: function (component) {
        window.open(component.find('URL__c').get("v.value"));
    },

    onDelete: function (component, event, helper) {
        confirm('Are You Sure?') && helper.handlePassworddelete(component, event);
    },

    onDuplicate: function (component, event, helper) {
        var duplicateEvent = component.getEvent("formDuplicateEvent");
        duplicateEvent.setParams({
            "recordId": component.get("v.newPassword.Id")
        });
        duplicateEvent.fire();
    },

})