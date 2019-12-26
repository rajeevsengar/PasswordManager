({
    init: function (cmp, event, helper) {
        var items = [{
                "title": "Credentials",
                "values": [{
                    "label": "Passwords",
                    "name": "PasswordsList",
                    "iconname": "standard:password"
                }, {
                    "label": "Bank Accounts",
                    "name": "BankAccountsList",
                    "iconname": "custom:custom16"
                }, {
                    "label": "Cards",
                    "name": "BankCardsList",
                    "iconname": "standard:scan_card"
                }]
            },
            {
                "title": "Notes",
                "values": [{
                    "label": "Notes",
                    "name": "Notes",
                    "iconname": "doctype:txt"
                }]
            }
        ];
        cmp.set('v.items', items);
    },
    handleSelect: function (cmp, event, helper) {
        //return name of selected tree item
        debugger
        var selectedItem = event.getParam('name');
        helper.getLabel(cmp, selectedItem);
        var selectedLabel = cmp.get("v.selectedLabel");
        var menuEvent = cmp.getEvent("verticalnavigationevent");
        menuEvent.setParams({
            "name": selectedItem
        });
        menuEvent.setParams({
            "label": selectedLabel
        });
        menuEvent.fire();

    }
});