public with sharing class PasswordsListController {
    @AuraEnabled
    public static AllPasswordsWrapper getAllPasswords(){
        List<AllPasswordsWrapper> allPasswords = new List<AllPasswordsWrapper>();
        List<Password__c> passwords = [select Username__c,Password__c,URL__c ,Description__c,User__c,Category__c,Website__c,lastmodified__c from Password__c];
        return new AllPasswordsWrapper(passwords,getCategory(),getWebsite());
    }

    @AuraEnabled
    public static void saveAllPasswords(List<Password__c> passwordsList){
        upsert passwordsList;
    }

    
    private static List<LabelVsValueWrapper> getCategory(){
        List<LabelVsValueWrapper> categoryList = new List<LabelVsValueWrapper>();
        categoryList.add(new LabelVsValueWrapper('Other','',''));
        for(Controlling_Picklist__c category : [select Name from Controlling_Picklist__c where Field_API_Name__c = 'Category__c']){
            categoryList.add(new LabelVsValueWrapper(category.Name,category.Id,''));
        }
        return categoryList;
    }

    private static List<LabelVsValueWrapper> getWebsite(){
        List<LabelVsValueWrapper> websitesList = new List<LabelVsValueWrapper>();
        websitesList.add(new LabelVsValueWrapper('Other','',''));
        String query = 'select Name,Controlling_Picklist__c from Dependent_Picklist__c';
        for(Dependent_Picklist__c website : Database.query(query)){
            websitesList.add(new LabelVsValueWrapper(website.Name,website.Id,website.Controlling_Picklist__c));
        }
        return websitesList;
    }

    public class LabelVsValueWrapper{
        @AuraEnabled
        public string label;
        @AuraEnabled
        public string value;
        @AuraEnabled
        public string category;
        public LabelVsValueWrapper(string label,string value,String category){
            this.label = label;
            this.value = value;
            this.category = category;
        }
    }

    public class AllPasswordsWrapper{
        @AuraEnabled
        public List<Password__c> passwords;
        @AuraEnabled
        public List<LabelVsValueWrapper> categories;
        @AuraEnabled
        public List<LabelVsValueWrapper> websites;
        public AllPasswordsWrapper(List<Password__c> passwords,List<LabelVsValueWrapper> categories,List<LabelVsValueWrapper> websites){
            this.passwords = passwords;
            this.categories = categories;
            this.websites = websites;
        }
    }
}
