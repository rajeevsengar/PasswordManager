({
    onSave: function (component) {
        var saveEvent = component.getEvent("headerButtonEvent");
        saveEvent.setParams({ "context": "save" });
        saveEvent.fire();
    },
    onAdd: function (component) {
        var addEvent = component.getEvent("headerButtonEvent");
        addEvent.setParams({ "context": "add" });
        addEvent.fire();
    },
})