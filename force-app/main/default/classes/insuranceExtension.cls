public class insuranceExtension {
    public List<Insurance__c> listInsurance{get;set;}
    
    public void runMeFirst(){
        listInsurance = [select Aadhar__c,Cover_Amount__c,Duration__c,Premium__c,Maturity_Date__c from Insurance__c];

         for(Insurance__c obj : listInsurance )
        {
            obj.Cover_Amount__c = 123456;
        }
        if(listInsurance.size() > 0)
        {
            update listInsurance;//this seems to just update the list. How do I actually update the custom object?
        }
    }
    
}