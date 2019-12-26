public with sharing class FormController {
    public FormController() {

    }
    private static String categoryId;
    @AuraEnabled
    public static List<LabelVsValueWrapper> getCategory(){
        List<LabelVsValueWrapper> labelVsValue = new List<LabelVsValueWrapper>();
        labelVsValue.add(new LabelVsValueWrapper('Other',''));
        for(Controlling_Picklist__c category : [select Name from Controlling_Picklist__c where Field_API_Name__c = 'Category__c']){
            labelVsValue.add(new LabelVsValueWrapper(category.Name,category.Id));
        }
        return labelVsValue;
    }
    @AuraEnabled
    public static List<LabelVsValueWrapper> getWebsite(String category){
        List<LabelVsValueWrapper> labelVsValue = new List<LabelVsValueWrapper>();
        labelVsValue.add(new LabelVsValueWrapper('Other',''));
        String query = 'select Name from Dependent_Picklist__c';
        if(category != ''){
            query += ' where Controlling_Picklist__c = :category';
        }
        for(Dependent_Picklist__c website : Database.query(query)){
            labelVsValue.add(new LabelVsValueWrapper(website.Name,website.Id));
        }
        return labelVsValue;
    }

    @AuraEnabled
    public static void savePassword(Password__c passwordObject){
        if(!isNameExists(passwordObject.Category__c,passwordObject.Category__c,'Controlling_Picklist__c')){
            Controlling_Picklist__c category = new Controlling_Picklist__c(Name = passwordObject.Category__c , Field_API_Name__c = 'Category__c');
            upsert category;
            categoryId = category.Id;
            passwordObject.Category__c = category.Id;
        }
        if(!isNameExists(passwordObject.Website__c,passwordObject.Category__c,'Dependent_Picklist__c')){
            Dependent_Picklist__c website = new Dependent_Picklist__c(Name = passwordObject.Website__c , Controlling_Picklist__c = categoryId);
            upsert website;
            passwordObject.Website__c = website.Id;
        }
        upsert passwordObject;
    }

    private static Boolean isNameExists(String name,String categoryName,String objectApi){
        List<SObject> listSObject = new List<SObject>();
        String query = 'select id from ' + objectApi + ' where id = :name';
        if(objectApi.equalsIgnoreCase('Dependent_Picklist__c')){
            query += ' and Controlling_Picklist__c = :categoryName';
        }

        listSObject = Database.query(query);
        if(listSObject.size() > 0){
            if(objectApi.equalsIgnoreCase('Controlling_Picklist__c')){
                categoryId = (String)listSObject[0].get('Id');
            }
            return true;
        }else{
            return false;
        }
    }

    public class LabelVsValueWrapper{
        @AuraEnabled
        public string label;
        @AuraEnabled
        public string value;
        public LabelVsValueWrapper(string label,string value){
            this.label = label;
            this.value = value;
        }
    }
}