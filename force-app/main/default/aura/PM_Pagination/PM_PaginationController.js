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

    onFirst: function (component) {
        component.set("v.pageNumber", 1);
    },

    onLast: function (component) {
        component.set("v.pageNumber", component.get("v.totalPages"));
    },

    handlePageNumberChange: function (component, event, helper) {
        helper.setIndexes(component);
    },

    handleRecordPerPageChange: function (component, event, helper) {
        var recordsSet = component.get("v.recordsSet");
        var pageNumber = component.get("v.pageNumber");
        pageNumber = Math.ceil(pageNumber / recordsSet);
        component.set("v.pageNumber", pageNumber);
        helper.calculateTotalPages(component);
        helper.setIndexes(component);
    },

    handleTotalRecordsChange: function (component, event, helper) {
        helper.calculateTotalPages(component);
    },

})