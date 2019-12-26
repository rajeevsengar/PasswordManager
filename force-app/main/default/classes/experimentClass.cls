public class experimentClass {
    public boolean flag {get; set;}
    public experimentClassDependent.myWrapper o = new experimentClassDependent.myWrapper();
    public experimentClass(ApexPages.StandardController controller){
        o = experimentClassDependent.getFlag();
        flag = o.f;
        System.debug('flag '+ o.f);
    }
    
    public void callMe(){
       // List<Account> acc = experimentClassDependent.getAcc();
        System.debug('Acc '+o.a);
    }
}