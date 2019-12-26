({
    init: function (component, event, helper) {

        var menuName = 'AdminConsole2';
        var menuLabel = 'Object Mapping';
        var np = component.get("v.namespace");

        component.set("v.selectedLabel", menuLabel);
        helper.createCmp(component, menuName, np);
    },

    handleMenuPageEvent: function (component, event, helper) {
        var menuName = component.get("v.menuName");
        var menuLabel = event.getParam("v.menuLabel");
        var np = component.get("v.namespace");

        component.set("v.selectedLabel", menuLabel);
        helper.createCmp(component, menuName, np);
    }
})