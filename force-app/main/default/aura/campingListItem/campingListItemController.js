({
	packItem : function(component, event, helper) {
		var mybtn = event.getSource();
        component.set("v.item.Packed__c",true);
        mybtn.set("v.disabled",true);
        
        
	}
})