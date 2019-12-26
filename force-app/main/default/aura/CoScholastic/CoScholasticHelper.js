({
    addMore: function (component) {
        var record = component.get("v.record");
        record.UniqueId__c = component.get("v.index");
        var recordString = JSON.stringify(record);
        var records = component.get("v.records");
        records.push(JSON.parse(recordString));
        component.set("v.records", records);
        this.clearRecord(component);
        component.set("v.index", component.get("v.index") + 1);
        component.set("v.selectedtab", 'one');
        console.log(JSON.stringify(component.get("v.records")));
    },
    clearRecord: function (component) {
        let record = component.get("v.record");
        let student = record.Student__c;
        component.set("v.record", {
            'sobjectType': 'Co_Scholastic__c',
            'Student__c': student,
            'Work_Education__c': null,
            'Art_Education__c': null,
            'Value_Education__c': null,
            'Scout_Guide__c': null,
            'Health_PE__c': null,
            'Discipline1__c': null,
            'GK__c': null,
            'Working_Days__c': '',
            'Present__c': '',
            'Absent__c': '',
            'Late__c': '',
            'Leave__c': '',
            'Height__c': '',
            'Weight__c': '',
            'BG__c': ''
        });
    },
    toggleShowData: function (component) {
        component.set("v.showtable", !component.get("v.showtable"));
    },
    inlineSave: function (component, row) {
        var records = component.get("v.records");
        var x;
        for (x in records) {
            if (records[x].UniqueId__c == row.UniqueId__c) {
                records[x].Work_Education__c = row.Work_Education__c;
                records[x].Art_Education__c = row.Art_Education__c;
                records[x].Health_PE__c = row.Health_PE__c;
                records[x].Discipline1__c = row.Discipline1__c;
                records[x].GK__c = row.GK__c;
                records[x].Value_Education__c = row.Value_Education__c;
                records[x].Scout_Guide__c = row.Scout_Guide__c;

                records[x].Working_Days__c = row.Working_Days__c;
                records[x].Present__c = row.Present__c;
                records[x].Absent__c = row.Absent__c;
                records[x].Late__c = row.Late__c;
                records[x].Leave__c = row.Leave__c;

                records[x].Height__c = row.Height__c;
                records[x].Weight__c = row.Weight__c;
                records[x].BG__c = row.BG__c;
            }
        }
        component.set("v.records", records);
        component.set('v.inlineedit', false);
    },
    saveRecords: function (component) {
        debugger
        component.set("v.showspinner", true);
        var action = component.get("c.saveCoScholastic");
        action.setParams({
            records: component.get("v.records")
        });
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.showspinner", false);
                component.set("v.records", []);
                component.set("v.index", 0);
            } else {
                console.log("Error");
            }
        });
        $A.enqueueAction(action);
    },
})