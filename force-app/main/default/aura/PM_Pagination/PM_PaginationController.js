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

    handleRecordPerPageChange: function (component, event, helper) {
        var recordsSet = component.get("v.recordsSet");
        var pageNumber = component.get("v.pageNumber");
        var totalRecords = component.get("v.totalRecords");
        var recordsConstant = component.get("v.recordsConstant");
        var recordsPerPage = recordsSet * recordsConstant;

        pageNumber = Math.ceil(pageNumber / recordsSet);
        component.set("v.pageNumber", pageNumber);
        component.set("v.totalPages", Math.ceil(totalRecords / recordsPerPage));
        helper.setIndexes(component);
        helper.sendIndexes(component);
    },

    handleTotalRecordsChange: function (component, event, helper) {
        var recordsSet = component.get("v.recordsSet");
        var totalRecords = component.get("v.totalRecords");
        var recordsConstant = component.get("v.recordsConstant");
        var recordsPerPage = recordsSet * recordsConstant;
        component.set("v.totalPages", Math.ceil(totalRecords / recordsPerPage));
    },

})