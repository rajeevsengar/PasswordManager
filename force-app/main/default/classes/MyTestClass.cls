@Istest
public class MyTestClass {
    static testMethod void validateDateOfBirth(){
        Aadhar__c a = new Aadhar__c(Name__c = 'Rakesh',
                                   Phone_Number__c = '24',
                                   Date_Of_Birth__c = Date.newInstance(2019, 2, 11),
                                   Aadhar_Number__c = 215611651);
        
        insert a;
        
        Aadhar__c j = [select id,name from Aadhar__c where id = :a.Id];
        system.assertEquals(Date.today(), j.Date_Of_Birth__c);
        
        
    }
}