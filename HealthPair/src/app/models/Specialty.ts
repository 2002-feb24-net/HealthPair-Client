import { Provider } from '../models';

export class Specialty
{
    SpecialtyId : number;
    Specialty : string;

    Providers : Provider[];
}