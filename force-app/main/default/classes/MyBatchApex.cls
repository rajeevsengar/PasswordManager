public class MyBatchApex implements Database.Batchable<Contact>{
    public System.Iterable<Contact> start(Database.BatchableContext ctx){
        List<Contact> contacts = [Select name,email,birthdate from contact];
        return contacts;
    }
    
    public void execute(Database.BatchableContext ctx, List<Contact> lst){
        for(Contact c : lst){
            if(c.Birthdate == Date.today()){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[]{c.Email};
                mail.setToAddresses(toAddresses);
                mail.setSubject('Happy Birthday to you' + c.Name);
                mail.setPlainTextBody('Happy Birthday!');
                Messaging.sendEmail(new Messaging.SingleEmailMessage[]{mail});
            }
        }
    }
    
    public  void finish(Database.BatchableContext ctx){
        
    }
    
}