({
    getCategoryOptions: function (component) {
        var action = component.get("c.getCategory");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.options", response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    },


    getWebsiteOptions: function (component, selectedCategoryValue) {
        var action = component.get("c.getWebsite");
        action.setParams({
            category: selectedCategoryValue
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.websiteOptions", response.getReturnValue());
                component.set("v.selectedLabel", component.get("v.websiteOptions").find(opt => opt.value === component.get("v.newPassword.Website__c")).label);
            }
        });
        $A.enqueueAction(action);
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
        component.set("v.isCategoryOtherSelected", false);
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