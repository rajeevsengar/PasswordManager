({
    handleMenuPageEvent: function (component, event, helper) {
        debugger
        component.set("v.componentName", event.getParam("name"));
        component.set("v.label", event.getParam("label"));
    }
});