trigger before_insert_on_aadhaar on Aadhar__c (before insert,before update) {
    for(Aadhar__c a : trigger.new){
        system.debug(a);
    }
    
    if(trigger.isInsert){
        
    }
    
    if(trigger.isUpdate){
        
    }
}