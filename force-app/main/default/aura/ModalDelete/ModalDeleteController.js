({
    handleCancel: function (component) {
        component.find("overlayLib").notifyClose();
    },
    handleDelete: function (component) {
        var appEvent = $A.get("e.c:OverlayLibraryModalEvent");
        appEvent.setParams({
            "message": "Delete"
        });
        component.find("overlayLib").notifyClose();
        appEvent.fire();
    }
})