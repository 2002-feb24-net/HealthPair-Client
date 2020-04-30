import { Provider } from '../models';

export class Facility
{
    FacilityId : number;
    FacilityName : string;
    FacilityAddress1 : string;
    FacilityCity : string;
    FacilityState : string;
    FacilityZipcode : number;
    FacilityPhoneNumber : number;

    Providers : Provider[];
}