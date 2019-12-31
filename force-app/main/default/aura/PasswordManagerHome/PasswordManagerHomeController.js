({
    handleMenuPageEvent: function (component, event) {
        component.set("v.componentName", event.getParam("name"));
        component.set("v.label", event.getParam("label"));
    },

    handleHeaderSaveEvent: function (component) {
        component.set("v.isHeaderSaveClicked", !component.get("v.isHeaderSaveClicked"));
    },

    handleHeaderButtonEvent: function (component, event) {
        var context = event.getParam("context");
        if (context == 'save')
            component.set("v.isHeaderSaveClicked", !component.get("v.isHeaderSaveClicked"));
        else if (context == 'add')
            component.set("v.isHeaderAddClicked", !component.get("v.isHeaderAddClicked"));

    },
});