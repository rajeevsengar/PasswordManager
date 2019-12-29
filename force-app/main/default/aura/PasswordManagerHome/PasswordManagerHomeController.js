({
    handleMenuPageEvent: function (component, event, helper) {
        component.set("v.componentName", event.getParam("name"));
        component.set("v.label", event.getParam("label"));
    },
    handleHeaderSaveEvent: function (component, event, helper) {
        component.set("v.isHeaderSaveClicked", !component.get("v.isHeaderSaveClicked"));
    },
});