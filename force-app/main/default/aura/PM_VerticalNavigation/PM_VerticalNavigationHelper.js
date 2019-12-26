({
    getLabel: function (cmp) {
        var selectedItem = cmp.get("v.selectedItem");
        var items = cmp.get("v.items");

        for (var i = 0; i < items.length; i++) {
            if (selectedItem === items[i].name) {
                cmp.set("v.selectedLabel", items[i].label);
            }
        }
    }
})