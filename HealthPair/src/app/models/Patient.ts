import { Insurance,Appointment } from '.';

export class Patient
{
    PatientId : number;
    InsuranceId : number;
    PatientFirstName : string;
    PatientLastName : string;
    PatientAddress1 : string;
    PatientCity : string;
    PatientState : string;
    PatientZipcode : number;
    PatientBirthDay : Date;
    PatientPhoneNumber : number;
    Token : string;
    Admin : boolean;

    Insurance : Insurance;
    Appointments : Appointment[];
}