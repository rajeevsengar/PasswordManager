public with sharing class PasswordManagerService {
    public PasswordManagerService() {

    }

    public static List<Authorisation_Pin__c> getAuthPin(){
        String userId = UserInfo.getUserId();
        return [select PIN__c,Attempts__c,CreatedBy.FirstName,CreatedBy.LastName,CreatedBy.Email from Authorisation_Pin__c where CreatedById = :userId];
    }

    public static void sendEmail(String[] toAddresses,String senderName,String subject,String body){
        // Messaging.reserveSingleEmailCapacity(2);
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();

        // Assign the addresses for the To and CC lists to the mail object.
        mail.setToAddresses(toAddresses);

        // Specify the name used as the display name.
        mail.setSenderDisplayName(senderName);

        // Specify the subject line for your email address.
        mail.setSubject(subject);

        // Optionally append the salesforce.com email signature to the email.
        // The email address of the user executing the Apex Code will be used.
        mail.setUseSignature(false);

        mail.setHtmlBody(body);

        // Send the email you have created.
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}