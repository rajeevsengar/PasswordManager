({
	handleClick : function(component, event, helper) {
		var btn = event.getSource();
        var text = component.get("v.in");
        console.log(text);
        component.set("v.in2",text);
    
	}
})