({
    init: function (component, event, helper) {
        // helper.getCategoryOptions(component);

        // component.find("passwordRecordCreator").reloadRecord(
        //     false, // skip cache?
        //     $A.getCallback(function () {
        //         var rec = component.get("v.newPassword");
        //         var error = component.get("v.newPasswordError");
        //         if (error || (rec === null)) {
        //             console.log("Error initializing record template: " + error);
        //             return;
        //         }
        //         helper.getWebsiteOptions(component, component.get("v.newPassword.Category__c"));
        //     })
        // );
        helper.getWebsiteOptions(component);

    },

    handleChange: function (component, event, helper) {
        var selectedCategoryValue = event.getParam("value");
        if (selectedCategoryValue == '') {
            component.set("v.isCategoryOtherSelected", true);
        } else {
            component.set("v.isCategoryOtherSelected", false);
        }
        helper.getWebsiteOptions(component);
    },

    handleWebsiteChange: function (component, event, helper) {
        var selectedCategoryValue = event.getParam("value");
        if (selectedCategoryValue == '') {
            component.set("v.isWebsiteOtherSelected", true);
        } else {
            component.set("v.isWebsiteOtherSelected", false);
        }
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

        //  var pasteText = component.find('Username__c');
        // pasteText.setAttribute("value", "raj");
        // document.body.appendChild(pasteText); 

        // pasteText.focus();
        //navigator.clipboard.readText().then(text => alert(text));

        // document.body.removeChild(pasteText);
        // alert(pasteText.textContent);     



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

})