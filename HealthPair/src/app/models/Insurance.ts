import { Patient,Provider } from '../models';

export class Insurance
{
    InsuranceId : number;
    InsuranceName : string;

    Patients : Patient[];
    Providers : Provider[];
}