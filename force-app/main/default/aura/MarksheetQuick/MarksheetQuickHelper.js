({
    dynamicCreate: function (component) {
        this.clearRecord(component);
        $A.createComponent("c:MarksheetFieldsSet", {
                record1: component.getReference("v.record"),
            },
            $A.getCallback(function (newInp, status, error) {
                if (status === "SUCCESS") {
                    var body = component.get("v.body");
                    body.push(newInp);
                    component.set("v.body", body);
                } else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.");
                } else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            })
        );
    },
    addMore: function (component) {
        var objList = component.get("v.records");
        var obj = component.get("v.record");
        obj.UniqueId__c = component.get("v.index");
        obj.Marks_Obt_100__c = parseFloat(obj.PT1__c) + parseFloat(obj.Sub_Enrichment_5__c) + parseFloat(obj.Notebook__c) + parseFloat(obj.Half_Yealry_80__c);
        obj.Grade__c = this.calculateGrade(obj.Marks_Obt_100__c);
        var objString = JSON.stringify(obj);
        objList.push(JSON.parse(objString));
        component.set("v.records", objList);
        this.clearRecord(component);
        component.set("v.index", component.get("v.index") + 1);
        console.log(JSON.stringify(component.get("v.records")));
    },
    clearRecord: function (component) {
        var obj = component.get("v.record");
        obj.UniqueId__c = "";
        obj.Subjects__c = null;
        obj.PT1__c = "";
        obj.Notebook__c = "";
        obj.Sub_Enrichment_5__c = "";
        obj.Half_Yealry_80__c = "";
        obj.Marks_Obt_100__c = "";
        obj.Grade__c = "";
        component.set("v.record", obj);
    },
    saveRecords: function (component) {
        component.set("v.showspinner", true);
        var action = component.get("c.saveMarksheet");
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
    inlineSave: function (component, row) {
        if (this.validateData(row)) {
            var records = component.get("v.records");
            var x;
            for (x in records) {
                // if (records[x].Student__c == row.Student__c && records[x].Subjects__c == row.Subjects__c) {
                if (records[x].UniqueId__c == row.UniqueId__c) {
                    records[x].Student__c = row.Student__c;
                    records[x].Subjects__c = row.Subjects__c;
                    records[x].PT1__c = row.PT1__c;
                    records[x].Half_Yealry_80__c = row.Half_Yealry_80__c;
                    records[x].Sub_Enrichment_5__c = row.Sub_Enrichment_5__c;
                    records[x].Notebook__c = row.Notebook__c;
                    records[x].Marks_Obt_100__c = parseFloat(row.PT1__c) + parseFloat(row.Sub_Enrichment_5__c) + parseFloat(row.Notebook__c) + parseFloat(row.Half_Yealry_80__c);
                    records[x].Grade__c = this.calculateGrade(records[x].Marks_Obt_100__c);
                }
            }
            component.set("v.records", records);
            component.set('v.inlineedit', false);
        } else {
            this.showToast('Error', 'Please Recheck The Entered Data', 'Error');
        }
    },
    validateAndAdd: function (component) {
        if (this.validateData(component.get("v.record"))) {
            this.addMore(component);
        } else {
            this.showToast('Error', 'Please Recheck The Entered Data', 'Error');
        }
    },

    calculateGrade: function (marks) {
        if (marks > 90 && marks <= 100) {
            return 'A1';
        }
        if (marks > 80 && marks <= 90) {
            return 'A2';
        }
        if (marks > 70 && marks <= 80) {
            return 'B1';
        }
        if (marks > 60 && marks <= 70) {
            return 'B2';
        }
        if (marks > 50 && marks < 60) {
            return 'C1';
        }
        if (marks > 40 && marks < 50) {
            return 'C2';
        }
        if (marks > 32 && marks < 40) {
            return 'D';
        }
        if (marks <= 32) {
            return 'E';
        }

    },

    validateData: function (record) {
        if (record.PT1__c <= 10 &&
            record.Half_Yealry_80__c <= 80 &&
            record.Sub_Enrichment_5__c <= 5 &&
            record.Notebook__c <= 5 &&
            record.Marks_Obt_100__c <= 100) {
            return true;
        } else {
            return false;
        }
    },

    showToast: function (title, message, variant) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": title,
            "message": message,
            "type": variant
        });
        toastEvent.fire();
    },
    toggleShowData: function (component) {
        component.set("v.show", !component.get("v.show"));
        if (component.get("v.show")) {
            component.set("v.showlabel", "Hide Data");
        } else {
            component.set("v.showlabel", "Show Data");
        }
    }
})