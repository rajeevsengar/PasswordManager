({
    onSave: function (component, event, helper) {
        var saveEvent = component.getEvent("headerSaveEvent");
        saveEvent.fire();
    }
})