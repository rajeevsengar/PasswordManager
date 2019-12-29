public with sharing class PasswordsListController {
    @AuraEnabled
    public static AllPasswordsWrapper getAllPasswords(){
        List<AllPasswordsWrapper> allPasswords = new List<AllPasswordsWrapper>();
        List<Password__c> passwords = [select Username__c,Password__c,URL__c ,Description__c,User__c,Category__c,Website__c,lastmodified__c from Password__c];
        return new AllPasswordsWrapper(passwords,getCategory(),getWebsite());
    }

    @AuraEnabled
    public static void saveAllPasswords(List<Password__c> passwordsList){
        // List<LabelVsValueWrapper> categoryList = getCategory();
        // List<LabelVsValueWrapper> websitesList = getWebsite();
        // List<Controlling_Picklist__c> newCategories = new List<Controlling_Picklist__c>();
        // List<Dependent_Picklist__c> newWebsites = new List<Dependent_Picklist__c>();
        // for(Password__c password: passwordsList){
        //     boolean flag = true;
        //     for(LabelVsValueWrapper category : categoryList){
        //         if(category.value.equalsIgnoreCase(password.Category__c) || category.label.equalsIgnoreCase(password.Category__c)){
        //             flag = false;
        //             break;
        //         }
        //     }
        //     // flag true means category is newly added //
        //     if(flag){
        //         Controlling_Picklist__c category = new Controlling_Picklist__c(Name = password.Category__c , Field_API_Name__c = 'Category__c');
        //         newCategories.add(category);
        //         password.Category__c = category.Id;
        //         Dependent_Picklist__c website = new Dependent_Picklist__c(Name = password.Website__c , Controlling_Picklist__c = category.Id);
        //         newWebsites.add(website);
        //         password.Website__c = website.Id;
        //     }else{
        //         for(LabelVsValueWrapper website : websitesList){
        //             if(website.category.equalsIgnoreCase(password.Category__c) && (website.value.equalsIgnoreCase(password.Website__c) || website.label.equalsIgnoreCase(password.Website__c))){
        //                 flag = false;
        //                 break;
        //             }
        //         }
        //         // flag true means website is newly added in old category//
        //         if(flag){
        //             Dependent_Picklist__c website = new Dependent_Picklist__c(Name = password.Website__c , Controlling_Picklist__c = password.Category__c);
        //             newWebsites.add(website);
        //             password.Website__c = website.Id;
        //         }
        //     }

        // }
        // upsert newCategories;  
        // upsert newWebsites;  
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
