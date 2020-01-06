/**
 * @File Name          : FormController.cls
 * @Description        : 
 * @Author             : rajeevsengar@persistent.com
 * @Group              : 
 * @Last Modified By   : rajeevsengar@persistent.com
 * @Last Modified On   : 30/12/2019, 4:46:53 pm
 * @Modification Log   : 
 * Ver       Date            Author      		    Modification
 * 1.0    30/12/2019   rajeevsengar@persistent.com     Initial Version
**/
public with sharing class FormController {
    private static String categoryId;

    @AuraEnabled
    public static Password__c savePassword(Password__c passwordObject){
        passwordObject = PasswordsListController.refinePasswords(new List<Password__c>{passwordObject})[0];
        upsert passwordObject;
        return passwordObject;
    }

    @AuraEnabled
    public static void deletePassword(Password__c passwordObject){
        if(passwordObject != null && String.isNotBlank(passwordObject.Id))
            delete passwordObject;
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