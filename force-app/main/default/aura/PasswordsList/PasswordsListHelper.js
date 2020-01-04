({
    getAllPasswords: function (component) {
        var self = this;
        var action = component.get("c.getAllPasswords");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.passwordsList", response.getReturnValue().passwords);
                component.set("v.categoryOptions", response.getReturnValue().categories);
                component.set("v.websiteOptions", response.getReturnValue().websites);
                self.addNew(component);
                self.hideSpinner(component);
            }
        });

        $A.enqueueAction(action);
    },

    addNew: function (component) {
        var passwordsList = component.get("v.passwordsList");
        passwordsList.reverse();
        var length = component.get("v.passwordsList").length;
        component.set(`v.passwordsList[${length}].Id`, null);
        passwordsList.reverse();
        component.set("v.passwordsList", passwordsList);
        this.sendTotalRecords(component, length + 1);
    },

    duplicateForm: function (component, event) {
        var passwordsList = component.get("v.passwordsList");
        var recordId = event.getParam("recordId");
        var index;
        var password = Object.assign({}, passwordsList.find(function (password, i) {
            if (password.Id === recordId) {
                index = i;
                return password;
            }
        }));
        password.Id = null;
        passwordsList.splice(index, 0, password);
        component.set("v.passwordsList", passwordsList);
        this.sendTotalRecords(component, component.get("v.passwordsList").length);
    },

    sendTotalRecords: function (component, length) {
        var totalRecordsEvent = component.getEvent("totalRecordLoadedEvent");
        totalRecordsEvent.setParams({
            "totalRecords": length
        });
        totalRecordsEvent.fire();
    },



    saveAllPasswords: function (component) {
        var action = component.get("c.saveAllPasswords");
        action.setParams({
            passwordsList: component.get("v.passwordsList")
        });
        var self = this;
        this.showSpinner(component);
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                self.getAllPasswords(component);
            } else {
                alert('else');
            }
        });
        $A.enqueueAction(action);
    },
    showSpinner: function (component) {
        var spinner = component.find("mySpinner");
        $A.util.removeClass(spinner, "slds-hide");
    },

    hideSpinner: function (component) {
        var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
    },
})