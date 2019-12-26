({
	clickCreateItem : function(component, event, helper) {
		 var validExpense = component.find('campingform').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validExpense){
            // Create the new expense
            var newCamping = component.get("v.newCamping");
            //console.log("Create Camping: " + JSON.stringify(newCamping));
             helper.createCamping(component, newCamping);
         	 theCamping.push(newCamping);
			component.set("v.campingform", campingList);
        }
    }
	
})