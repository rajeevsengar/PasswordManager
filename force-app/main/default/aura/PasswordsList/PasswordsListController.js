({
    init: function (component, event, helper) {
        helper.getAllPasswords(component);
    },

    onButtonClicked: function (component, event, helper) {
        var params = event.getParam('arguments');
        var context;
        context = params && params.context;
        if (context == 'save')
            helper.saveAllPasswords(component);
        else if (context == 'add')
            helper.addNew(component);
    },

    handlePageRefreshEvent: function (component, event, helper) {
        helper.getAllPasswords(component);
    },

    handlePaginationEvent: function (component, event, helper) {
        component.set("v.start", event.getParam("startIndex"));
        component.set("v.end", event.getParam("lastIndex"));
    },
})