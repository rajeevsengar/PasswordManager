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
    public static void savePassword(Password__c passwordObject){
        PasswordsListController.saveAllPasswords(new List<Password__c>{passwordObject});
    }

    @AuraEnabled
    public static void deletePassword(Password__c passwordObject){
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