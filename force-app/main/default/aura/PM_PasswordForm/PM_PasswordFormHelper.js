({

    getWebsiteOptions: function (component) {
        var selectedCategoryValue = component.get("v.newPassword.Category__c");
        var selectedWebsiteValue = component.get("v.newPassword.Website__c");
        var websiteOptions = component.get("v.websiteOptions");
        var websites = [];
        for (var i = 0; i < websiteOptions.length; i++) {
            if (websiteOptions[i].category == selectedCategoryValue)
                websites.push(websiteOptions[i]);
            if (!selectedCategoryValue) {
                component.set("v.selectedLabel", "");
            } else if (websiteOptions[i].value === selectedWebsiteValue)
                component.set("v.selectedLabel", websiteOptions[i].label.toLowerCase());

        }
        component.set("v.websites", websites);
    },

    getWebsiteLabel: function (component, event) {
        var selectedWebsiteValue = event.getParam("value");

        function checkLabel(option) {
            if (option.value == selectedWebsiteValue) {
                return option;
            }
        }
        component.set("v.selectedLabel", component.get("v.websiteOptions").find(checkLabel).label.toLowerCase());
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
                component.set("v.newPassword", response.getReturnValue());
                component.set("v.resetPassword", Object.assign({}, response.getReturnValue()));
                self.hideSpinner(component);
                self.handleSuccess(event);
                self.checkIsUnsavedChanges(component);
            }
        });

        $A.enqueueAction(action);
    },

    checkIsUnsavedChanges: function (component) {
        var initialPassword = component.get("v.resetPassword");
        var currentPassword = component.get("v.newPassword");

        if (JSON.stringify(initialPassword) != JSON.stringify(currentPassword) || !currentPassword.Id) {
            component.set("v.isUnsavedChanges", true);
        } else {
            component.set("v.isUnsavedChanges", false);
        }
    },
    handlePassworddelete: function (component, event) {
        var self = this;
        if (component.get("v.newPassword.Id")) {
            var action = component.get("c.deletePassword");
            action.setParams({
                passwordObject: component.get("v.newPassword")
            });
            this.showSpinner(component);
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    self.hideSpinner(component);
                    self.sendIndex(component, 'delete');
                }
            });

            $A.enqueueAction(action);
        } else {
            self.sendIndex(component, 'delete');
        }
    },

    sendIndex: function (component, context) {
        var passwordFormIndexEvent = component.getEvent("passwordFormIndexEvent");
        passwordFormIndexEvent.setParams({
            "index": component.get("v.index"),
            "context": context
        });
        passwordFormIndexEvent.fire();
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
                // If record is present then set it in attribute
                component.set("v.newPassword.Id", passwordId);
            })
        );
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