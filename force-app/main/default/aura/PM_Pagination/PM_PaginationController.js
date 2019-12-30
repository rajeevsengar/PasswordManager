({
    init: function (component, event, helper) {
        helper.sendIndexes(component);
    },

    onNext: function (component) {
        component.set("v.pageNumber", component.get("v.pageNumber") + 1);
    },

    onPrevious: function (component) {
        component.set("v.pageNumber", component.get("v.pageNumber") - 1);
    },

    handlePageNumberChange: function (component, event, helper) {
        helper.setIndexes(component);
        helper.sendIndexes(component);
    },

})