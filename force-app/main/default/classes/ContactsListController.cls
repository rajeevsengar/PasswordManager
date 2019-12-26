public class ContactsListController {
    private Integer lim = 10;
    private String sortOrder = 'LastName';
    
    public List<Contact> getContact(){
        List<Contact> results = [select Id,FirstName,LastName,Title,Email from  contact limit :lim];
        return results;
    }
}