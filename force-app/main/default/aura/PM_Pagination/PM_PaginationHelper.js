({
    setIndexes: function (component) {
        var recordsSet = component.get("v.recordsSet");
        var recordsConstant = component.get("v.recordsConstant");
        var pageNumber = component.get("v.pageNumber");
        var recordsPerPage = recordsSet * recordsConstant;
        component.set("v.startIndex", recordsPerPage * (pageNumber - 1));
        component.set("v.lastIndex", recordsPerPage * pageNumber);
        this.sendIndexes(component);
    },

    sendIndexes: function (component) {
        var recordsSet = component.get("v.recordsSet");
        var paginationEvent = $A.get("e.c:PM_PaginationEvent");
        paginationEvent.setParams({
            "startIndex": component.get("v.startIndex"),
            "lastIndex": component.get("v.lastIndex"),
            "recordsSet": recordsSet
        });
        paginationEvent.fire();
    },

    calculateTotalPages: function (component) {
        var recordsSet = component.get("v.recordsSet");
        var totalRecords = component.get("v.totalRecords");
        var recordsConstant = component.get("v.recordsConstant");
        var recordsPerPage = recordsSet * recordsConstant;
        component.set("v.totalPages", Math.ceil(totalRecords / recordsPerPage));
    },
})