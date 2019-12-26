({
    sendOTPEmail: function (component) {
        var action = component.get("c.sendOTP");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                alert("From server: " + response.getReturnValue());
            }
        });

        $A.enqueueAction(action);
    }
})