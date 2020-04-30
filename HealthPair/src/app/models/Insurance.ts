import { Patient,Provider } from '.';

export class Insurance
{
    InsuranceId : number;
    InsuranceName : string;

    Patients : Patient[];
    Providers : Provider[];
}