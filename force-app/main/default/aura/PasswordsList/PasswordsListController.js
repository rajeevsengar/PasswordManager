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
            helper.addNewForm(component);
    },


    handlePaginationEvent: function (component, event, helper) {
        component.set("v.start", event.getParam("startIndex"));
        component.set("v.end", event.getParam("lastIndex"));
    },

    handleFormIndexEvent: function (component, event, helper) {
        if (event.getParam("context") == 'duplicate') {
            helper.duplicateForm(component, event);
        } else if (event.getParam("context") == 'delete') {
            helper.removeElementPasswordsWrapper(component, event.getParam("index"));
            helper.getPasswordsList(component);
        }
    },

})