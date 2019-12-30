public with sharing class FormController {
    private static String categoryId;

    @AuraEnabled
    public static void savePassword(Password__c passwordObject){
        upsert passwordObject;
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