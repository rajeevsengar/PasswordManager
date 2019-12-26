({
	createCamping : function(component, expense) {
		var theExpenses = component.get("v.campingList");
 
        // Copy the expense to a new object
        var newExpense = JSON.parse(JSON.stringify(newItem));
 
        theExpenses.push(newExpense);
        component.set("v.expenses", theExpenses);
	}
})