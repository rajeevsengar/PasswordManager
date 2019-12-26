public class AttachmentController {
    @AuraEnabled
    public static void updatePicturePath(String recId){
        //In Lightning Experience, Attachments are stored in ContentDocuments
        System.debug(recId);
        List<ContentDocumentLink> docLink = [ SELECT ContentDocumentId
                                             FROM ContentDocumentLink
                                             WHERE LinkedEntityId = :recId order by Id desc Limit 1];
        //ContentVersion Id uniquely identifies the attachment
        Speaker__c speaker = [SELECT Id FROM Speaker__c WHERE Id = :recId];
        if(docLink.size() != 0){
            ContentVersion ver = [SELECT Id FROM ContentVersion Where ContentDocumentId = :docLink[0].ContentDocumentId];
            //Update the Picture_Path field with the url of the image
            
            speaker.Picture_Path__c = '/sfc/servlet.shepherd/version/download/'+ ver.Id;
        }
        
        
        upsert speaker;
    }
    
}