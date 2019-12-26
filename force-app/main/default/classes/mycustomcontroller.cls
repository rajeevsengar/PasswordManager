public class mycustomcontroller {
	 public void method(){
        	system.debug([Find 'Ja' IN Name FIELDS RETURNING Contact]);
        	system.debug([Find 'Ja' IN Name FIELDS RETURNING Contact(phone,birthdate)]);
        	system.debug([Find 'Ja' IN Name FIELDS RETURNING Contact(phone,birthdate),Lead(phone,email)]);

         	
         	Database.executeBatch(new MyBatchApex(),200);
         	MyFuturClass.method(null);

    }
}