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
                console.log(JSON.stringify(response.getReturnValue()));
                self.addNew(component);
                self.hideSpinner(component);
            }
        });

        $A.enqueueAction(action);
    },

    addNew: function (component) {
        var length = component.get("v.passwordsList").length;
        component.set(`v.passwordsList[${length}].Id`, null);
    },

    saveAllPasswords: function (component) {
        console.table(component.get("v.passwordsList"));
        console.log(JSON.stringify(component.get("v.passwordsList")));
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