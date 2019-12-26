({
    createCmp : function(cmp, cmpName, np) {
        if(np){
            this.createCmpWithNP_NoServerCall(cmp, cmpName, np);
        }else{
            this.createCmpWithNP_ServerCall(cmp, cmpName)
        }        
    },

    createCmpWithNP_ServerCall : function(cmp, cmpName) {
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
        var action = cmp.get("c.getNamespace");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.namespace", response.getReturnValue());
                this.createCmpWithNP_NoServerCall(cmp, cmpName, response.getReturnValue());
            }
            else {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error",
                    "message": errorMessage,
                    "type": "error",
                    "mode": "sticky"
                });
                toastEvent.fire();
            }
        });

        $A.enqueueAction(action);
    },

    createCmpWithNP_NoServerCall: function (cmp, cmpName, np) {
        var selectedCmpName = np + ":" + cmpName;
        $A.createComponent(
            selectedCmpName,
            {
                "aura:id": cmpName + "id",
                "label": cmpName,
                "objectMap": cmp.get('v.objectMap')
            },
            function (newCmp, status, errorMessage) {
                //Add the new button to the body array
                if (status === "SUCCESS") {
                    var body = cmp.get("v.body");
                    body.push(newCmp);
                    cmp.set("v.body", newCmp);
                }
                else if (status === "INCOMPLETE") {
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
                }
                else if (status === "ERROR") {
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
    }

})