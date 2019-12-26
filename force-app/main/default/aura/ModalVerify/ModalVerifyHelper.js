({
    getPin: function (component) {
        var action = component.get("c.getPin");
        action.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                let wrapper = response.getReturnValue();
                if (wrapper.isNew) {
                    component.set("v.isNew", true);
                } else {
                    component.set("v.isNew", false);
                    component.set("v.password", wrapper.authPin.PIN__c);
                    component.set("v.attempts", wrapper.authPin.Attempts__c);
                    component.set("v.username", wrapper.authPin.CreatedBy.FirstName + ' ' + wrapper.authPin.CreatedBy.LastName);
                    component.set("v.email", wrapper.authPin.CreatedBy.Email);
                }
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("Error", errors[0].message, "error");
                    }
                }
            }
        });

        $A.enqueueAction(action);
    },

    createPin: function (component) {
        var action = component.get("c.createPin");
        action.setParam("PIN", component.get("v.password"));
        action.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                var appEvent = $A.get("e.c:OverlayLibraryModalEvent");
                appEvent.setParams({
                    "authenticated": "true"
                });
                component.find("overlayLib").notifyClose();
                appEvent.fire();
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("Error", errors[0].message, "error");
                    }
                }
            }
        });

        $A.enqueueAction(action);
    },

    updateAttempt: function (component) {
        var action = component.get("c.updateAttempt");
        action.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.attempts", response.getReturnValue().Attempts__c);
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("Error", errors[0].message, "error");
                    }
                }
            }
        });

        $A.enqueueAction(action);
    },

    sendOTPEmail: function (component) {
        debugger
        // var action = component.get("c.sendOTP");
        // action.setCallback(this, function (response) {
        //     var state = response.getState();
        //     if (state === "SUCCESS") {
        //         alert("From server: " + response.getReturnValue());
        //     }
        // });

        // $A.enqueueAction(action);

        var action = component.get("c.sendOTPViaEmail");
        action.setCallback(this, function (response) {
            if (response.getState() === "SUCCESS") {
                // let wrapper = response.getReturnValue();
                // if (wrapper.isNew) {
                //     component.set("v.isNew", true);
                // } else {
                //     component.set("v.isNew", false);
                //     component.set("v.password", wrapper.authPin.PIN__c);
                //     component.set("v.attempts", wrapper.authPin.Attempts__c);
                //     component.set("v.username", wrapper.authPin.CreatedBy.FirstName + ' ' + wrapper.authPin.CreatedBy.LastName);
                //     component.set("v.email", wrapper.authPin.CreatedBy.Email);
                // }
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        this.showToast("Error", errors[0].message, "error");
                    }
                }
            }
        });

        $A.enqueueAction(action);
    }
})