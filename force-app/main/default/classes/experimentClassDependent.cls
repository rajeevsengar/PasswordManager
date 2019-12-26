public class experimentClassDependent {
	public static List<Account> acc;
    public class myWrapper{
        public boolean f;
        public List<Account> a;
    }
    public static myWrapper getFlag(){
        acc = [select Name from account];
        System.debug('Inner '+acc);
        myWrapper obj = new myWrapper();
        obj.f = true;
        obj.a = acc;
        return obj;
    }
    public static List<Account> getAcc(){
		return acc;
    }
}