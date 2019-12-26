public with sharing class PasswordManagerCtrl {
    public PasswordManagerCtrl() {

    }

    @AuraEnabled
    public static WrapperAuthPin getPin(){
        List<Authorisation_Pin__c> authPin = PasswordManagerService.getAuthPin();
        if(authPin.size() > 0){
            return new WrapperAuthPin(authPin,false);
        }else{
            return new WrapperAuthPin(authPin,true);
        }
    }

    @AuraEnabled
    public static void createPin(Integer PIN){
        insert new Authorisation_Pin__c(PIN__c = PIN);
    }

    @AuraEnabled
    public static Authorisation_Pin__c updateAttempt(){
        List<Authorisation_Pin__c> authPin = PasswordManagerService.getAuthPin();
        if(authPin.size() > 0){
            authPin[0].Attempts__c = authPin[0].Attempts__c - 1;
            update authPin;
        }
        return authPin[0];
    }

    @AuraEnabled
    public static WrapperAuthPin sendOTPViaEmail(){
        System.debug('0');
        List<Authorisation_Pin__c> authPin = PasswordManagerService.getAuthPin();
        if(authPin.size() > 0){
            System.debug(authPin);
            String[] toEmail = new String[] {authPin[0].CreatedBy.Email};
            String username = authPin[0].CreatedBy.firstname + ' ' + authPin[0].CreatedBy.lastname;
            String body = '<p>Hi '+ username +',</p><p>Your OTP to reset password is - <b>1111</b></p>';
            PasswordManagerService.sendEmail(toEmail,'Password Manager','OTP to reset password',body);
            System.debug('ifend');
            return new WrapperAuthPin(authPin,false);
        }else{
            return new WrapperAuthPin(authPin,true);
        }

    }

    class WrapperAuthPin{
        @AuraEnabled
        public Boolean isNew;
        @AuraEnabled
        public Authorisation_Pin__c authPin;

        public WrapperAuthPin(List<Authorisation_Pin__c> authPin,Boolean isNew){
            this.isNew= isNew;
            if(!isNew){
                this.authPin = authPin[0];
            }
        }
    }
}