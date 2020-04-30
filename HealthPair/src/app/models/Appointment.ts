import { Patient,Provider } from '.';

export class Appointment
{
    AppointmentId : number;
    PatientId : number;
    ProviderId : number;
    AppointmentDate : Date;

    Patient : Patient;
    Provider : Provider;
}
