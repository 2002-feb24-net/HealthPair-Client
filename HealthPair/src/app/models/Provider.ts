import { Facility,Specialty,Appointment,Insurance } from '../models';

export class Provider
{
    ProviderId : number;
    FacilityId : number;
    SpecialtyId : number;
    ProviderFirstName : string;
    ProviderLastName : string;
    ProviderPhoneNumber : number;

    Facility : Facility;
    Specialty : Specialty;
    Appointments : Appointment[];
    Insurances : Insurance[];
}