({
    setIndexes: function (component) {
        var numberOfRecords = component.get("v.numberOfRecords");
        var recordsConstant = component.get("v.recordsConstant");
        var pageNumber = component.get("v.pageNumber");
        component.set("v.startIndex", numberOfRecords * recordsConstant * (pageNumber - 1));
        component.set("v.lastIndex", numberOfRecords * recordsConstant * pageNumber);
    },

    sendIndexes: function (component) {
        var numberOfRecords = component.get("v.numberOfRecords");
        var paginationEvent = $A.get("e.c:PM_PaginationEvent");
        paginationEvent.setParams({
            "startIndex": component.get("v.startIndex"),
            "lastIndex": component.get("v.lastIndex"),
            "numberOfRecords": component.get("v.numberOfRecords")
        });
        paginationEvent.fire();
    },
})