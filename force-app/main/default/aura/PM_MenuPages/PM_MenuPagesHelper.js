({
    createCmp: function (component) {
        var self = this;
        var cmpName = component.get("v.selectedComponent");
        var selectedCmpName = "c:" + cmpName;
        $A.createComponent(
            selectedCmpName, {
                "aura:id": cmpName + "id",
                "label": component.get("v.selectedLabel"),
            },
            function (newCmp, status, errorMessage) {
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(newCmp);
                    component.set("v.body", newCmp);
                } else if (status === "INCOMPLETE") {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "message": "No response from server or client is offline.",
                        "type": "error",
                        "mode": "sticky"
                    });
                    toastEvent.fire();
                    console.log("No response from server or client is offline.")
                    // Show offline error
                } else if (status === "ERROR") {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Error",
                        "message": errorMessage,
                        "type": "error",
                        "mode": "sticky"
                    });
                    toastEvent.fire();
                    console.log("Error: " + errorMessage);
                    // Show error message
                }
            }
        );

    },

    setIndexes: function (component) {
        debugger
        console.log(component.get("v.startIndex"));
        console.log(component.get("v.lastIndex"));
        var passwordsList = component.find('PasswordsListid');
        if (passwordsList.length > 0) {
            passwordsList[0].setIndexesMethod(component.get("v.startIndex"), component.get("v.lastIndex"));
        }
    },

})