public with sharing class MarksheetController {
    public MarksheetController() {

    }

    @AuraEnabled
    public static void saveMarksheet(List<Marksheet__c> records){
        System.debug(records);
        upsert records;
    }
    
    @AuraEnabled
    public static void saveCoScholastic(List<Co_Scholastic__c> records){
        System.debug(records);
        upsert records;
    }
    
    @AuraEnabled
    public static void deleteMarksheet(List<Marksheet__c> records,List<Id> deleteRecords){
       upsert records;
        delete [select id from Marksheet__c where id in :deleteRecords];
    }
    
    @AuraEnabled
    public static  Map<String,List<Marksheet__c>> getAllMarksheets(){
        // return [SELECT Student__c,Subjects__c,PT1__c,Notebook__c,Sub_Enrichment_5__c,Half_Yealry_80__c,Marks_Obt_100__c,Grade__c FROM Marksheet__c];
        List<Marksheet__c> marksheetList = [SELECT Student__c,Subjects__c,PT1__c,Notebook__c,Sub_Enrichment_5__c,Half_Yealry_80__c,Marks_Obt_100__c,Grade__c FROM Marksheet__c ORDER BY Student__c ASC NULLS FIRST];
        Map<String,List<Marksheet__c>> mapMarksheet = new Map<String,List<Marksheet__c>>();
        for(Marksheet__c marksheet : marksheetList){
            List<Marksheet__c> ls ;
            if(mapMarksheet.get(marksheet.Student__c) != null){
                ls = mapMarksheet.get(marksheet.Student__c);
            }else{
                ls = new List<Marksheet__c>();
            }
            ls.add(marksheet);
            mapMarksheet.put(marksheet.Student__c,ls);
        }
        return mapMarksheet;
    }

}