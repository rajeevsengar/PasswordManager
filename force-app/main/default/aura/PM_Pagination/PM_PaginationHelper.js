({
    setIndexes: function (component) {
        var numberOfRecords = component.get("v.numberOfRecords");
        var pageNumber = component.get("v.pageNumber");
        component.set("v.startIndex", numberOfRecords * (pageNumber - 1));
        component.set("v.lastIndex", numberOfRecords * pageNumber);
    },

    sendIndexes: function (component) {
        var paginationEvent = $A.get("e.c:PM_PaginationEvent");
        paginationEvent.setParams({
            "startIndex": component.get("v.startIndex")
        });
        paginationEvent.setParams({
            "lastIndex": component.get("v.lastIndex")
        });
        paginationEvent.fire();
    },
})