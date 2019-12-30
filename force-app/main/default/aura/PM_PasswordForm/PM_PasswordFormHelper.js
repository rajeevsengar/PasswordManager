({

    getWebsiteOptions: function (component) {
        var selectedCategoryValue = component.get("v.newPassword.Category__c");
        var websiteOptions = component.get("v.websiteOptions");
        var websites = [];
        for (var i = 0; i < websiteOptions.length; i++) {
            if (websiteOptions[i].category == selectedCategoryValue)
                websites.push(websiteOptions[i]);
        }
        component.set("v.websites", websites);
    },

    handlePasswordSave: function (component, event) {
        var action = component.get("c.savePassword");
        var self = this;
        action.setParams({
            passwordObject: component.get("v.newPassword")
        });
        this.showSpinner(component);
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                self.hideSpinner(component);
                self.handleSuccess(event);
            }
        });

        $A.enqueueAction(action);
    },

    handlePassworddelete: function (component, event) {
        var self = this;
        component.find("passwordRecordCreator").deleteRecord(
            $A.getCallback(function () {
                self.refreshPage(component);
            })
        );
    },

    refreshPage: function (component) {
        var pageRefreshEvent = component.getEvent("pageRefreshEvent");
        pageRefreshEvent.fire();
    },

    handleSuccess: function (event) {
        var orignalLabel = event.getSource().get("v.label");
        event.getSource().set("v.iconName", 'utility:check');
        event.getSource().set("v.label", 'Saved');

        setTimeout(function () {
            event.getSource().set("v.iconName", 'utility:save');
            event.getSource().set("v.label", orignalLabel);
        }, 700);
    },

    clearForm: function (component) {
        var passwordId = component.get("v.newPassword").Id;
        component.find("passwordRecordCreator").getNewRecord(
            "Password__c", // sObject type 
            null, // recordTypeId
            false, // skip cache?
            $A.getCallback(function () {
                var rec = component.get("v.newPassword");
                var error = component.get("v.newPasswordError");
                if (error || (rec === null)) {
                    console.log("Error initializing record template: " + error);
                    return;
                }
                console.log("Record template initialized: " + rec.sobjectType);
            })
        );
        component.set(component.get("v.newPassword").Id, passwordId);
    },

    showSpinner: function (component) {
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },

    hideSpinner: function (component) {
        var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
    },

    copyTextHelper: function (component, event, text) {
        var hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("value", text);
        document.body.appendChild(hiddenInput);
        hiddenInput.select();
        document.execCommand("copy");
        document.body.removeChild(hiddenInput);
        // var orignalLabel = event.getSource().get("v.label");
        event.getSource().set("v.iconName", 'utility:check');
        setTimeout(function () {
            event.getSource().set("v.iconName", 'utility:copy_to_clipboard');
        }, 700);

    },

})