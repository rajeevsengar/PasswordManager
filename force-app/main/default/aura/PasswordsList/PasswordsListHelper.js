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
                self.createPasswordsWrapper(component);
                self.addNew(component);
                self.hideSpinner(component);
            }
        });

        $A.enqueueAction(action);
    },

    createPasswordsWrapper: function (component) {
        var passwordsList = component.get("v.passwordsList");
        var passwordsWrapper = [];
        passwordsList.forEach(function (item, index) {
            passwordsWrapper.push({
                "newPassword": item,
                "resetPassword": Object.assign({}, item)
            });
        });
        component.set("v.passwordsWrapper", passwordsWrapper);
    },

    addElementPasswordsWrapper: function (component, index, password) {
        var passwordJson = {
            "newPassword": password,
            "resetPassword": Object.assign({}, password)
        };
        var passwordsWrapper = component.get("v.passwordsWrapper");
        passwordsWrapper.splice(index, 0, passwordJson);
        component.set("v.passwordsWrapper", passwordsWrapper);
    },

    getPasswordsList: function (component) {
        var passwordsWrapper = component.get("v.passwordsWrapper");
        var passwordsList = [];
        passwordsWrapper.forEach(function (item, index) {
            passwordsList.push(item.newPassword);
        });
        component.set("v.passwordsList", passwordsList);
    },

    addNew: function (component) {
        var passwordsList = component.get("v.passwordsList");
        passwordsList.reverse();
        var length = passwordsList.length;
        component.set(`v.passwordsList[${length}].Id`, null);
        passwordsList.reverse();
        component.set("v.passwordsList", passwordsList);
        this.addElementPasswordsWrapper(component, 0, passwordsList[0]);
        this.sendTotalRecords(component, length + 1);
    },

    duplicateForm: function (component, event) {
        this.getPasswordsList(component);
        var passwordsList = component.get("v.passwordsList");
        var index = event.getParam("index");
        var password = Object.assign({}, passwordsList[index]);
        password.Id = null;
        passwordsList.splice(index, 0, password);
        this.addElementPasswordsWrapper(component, index, password);
        this.sendTotalRecords(component, passwordsList.length);
    },

    sendTotalRecords: function (component, length) {
        var totalRecordsEvent = component.getEvent("totalRecordLoadedEvent");
        totalRecordsEvent.setParams({
            "totalRecords": length
        });
        totalRecordsEvent.fire();
    },

    saveAllPasswords: function (component) {
        this.getPasswordsList(component);
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