({
    getAllRecords: function (component) {
        var action = component.get("c.getAllMarksheets");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.records", response.getReturnValue());
                this.createOptions(component);
            } else {
                console.log("Error");
            }
        });
        $A.enqueueAction(action);
    },

    createOptions: function (component) {
        var options = [];
        for (var key in component.get('v.records')) {
            var item = {
                "label": key,
                "value": key
            };
            options.push(item);
        }
        component.set("v.options", options);
    },
    saveRecords: function (component) {
        console.log(JSON.stringify(component.get("v.deletedrecords")));
        component.set("v.showspinner", true);
        var action1 = component.get("c.deleteMarksheet");
        action1.setParams({
            "records": component.get("v.data"),
            "deleteRecords": component.get("v.deletedrecords")
        });
        action1.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                this.getAllRecords(component);
                component.set("v.showspinner", false);
            } else if (state === "INCOMPLETE") {
                // do something
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                            errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action1);

    },
    inlineSave: function (component, row) {
        if (this.validateData(row)) {
            var records = component.get("v.data");
            var x;
            for (x in records) {
                // if (records[x].Student__c == row.Student__c && records[x].Subjects__c == row.Subjects__c) {
                if (records[x].Id == row.Id) {
                    records[x].PT1__c = row.PT1__c;
                    records[x].Half_Yealry_80__c = row.Half_Yealry_80__c;
                    records[x].Sub_Enrichment_5__c = row.Sub_Enrichment_5__c;
                    records[x].Notebook__c = row.Notebook__c;
                    records[x].Marks_Obt_100__c = parseFloat(row.PT1__c) + parseFloat(row.Sub_Enrichment_5__c) + parseFloat(row.Notebook__c) + parseFloat(row.Half_Yealry_80__c);
                    records[x].Grade__c = this.calculateGrade(records[x].Marks_Obt_100__c);
                }
            }
            component.set("v.data", records);
            component.set('v.inlineedit', false);
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
    deleteDetails: function (component, row) {
        var records = component.get("v.data");
        console.log(JSON.stringify(records));
        var deletedRecords = [];
        if (component.get("v.deletedrecords").length > 0) {
            deletedRecords = component.get("v.deletedrecords");
        }
        for (var x = 0; x < records.length; x++) {
            if (records[x].Id == row.Id) {
                let record = records.splice(x, 1);
                deletedRecords.push(record[0].Id);
                x--;
            }
        }
        component.set("v.data", records);
        component.set("v.deletedrecords", deletedRecords);
    },
    validateData: function (record) {
        if (record.PT1__c <= 10 &&
            record.Half_Yealry_80__c <= 80 &&
            record.Sub_Enrichment_5__c <= 5 &&
            record.Notebook__c <= 5
        ) {
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
    }
})