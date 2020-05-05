export class Patient
{
    PatientId : number;
    PatientFirstName : string;
    PatientLastName : string;
    PatientPassword : string;
    PatientAddress1 : string;
    PatientCity : string;
    PatientState : string;
    PatientZipcode : number;
    PatientBirthDay : Date;
    PatientPhoneNumber : number;
    PatientEmail : string;
    IsAdmin : boolean;
    Token : string;

    InsuranceId : number;
    InsuranceName : string;
}