({
    doInit: function (component, event, helper) {
        helper.getPin(component);
    },

    verifyPassword: function (component, event, helper) {
        var appEvent = $A.get("e.c:OverlayLibraryModalEvent");
        if (component.get("v.inputPass") == component.get("v.password")) {
            appEvent.setParams({
                "authenticated": "true"
            });
            component.find("overlayLib").notifyClose();
            appEvent.fire();
        } else {
            helper.updateAttempt(component);
        }
    },

    createPassword: function (component, event, helper) {
        if (component.get("v.inputPass") == component.get("v.password")) {
            helper.createPin(component);
        } else {

        }
    },

    sendOTP: function (component, event, helper) {
        helper.sendOTPEmail(component);
    }
})