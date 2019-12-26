public class MyCustomLeadController {
	private Lead lead;
    
    public MyCustomLeadController(){
        lead = [SELECT Name,LastName,Company,Status,NumberOFEmployees
               FROM Lead
               WHERE Id = :ApexPages.currentPage().getParameters().get('id')];
    }
    
    public Lead getLead(){return lead;}
    
    public PageReference save(){
        update lead;
        return null;
    }
    
}