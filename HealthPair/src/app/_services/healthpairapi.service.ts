import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

import { Appointment,Facility,Insurance,Patient,Provider,Specialty } from "../models"
import { AlertService } from '../_services';


@Injectable({
  providedIn: 'root'
})
export class HealthPairService
{
  private baseUrl = environment.healthPairApiBaseUrl;

  get defaultUserId() { return 0; }

  constructor(private http: HttpClient, private alertService: AlertService) { }

  httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ! ***** APPOINTMENT ********
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~

/**
* Sends a requests for all appointments in the database.
*
* @example
* Simply call the function:
* getAppointmentAll()
*
* @returns An Observable with all of the Appointments in the database
*/
  getAppointmentAll() : Observable<Appointment[]>
  {
    return this.http.get<Appointment[]>(`${this.baseUrl}api/appointments`)
      .pipe(
        catchError(this.handleError<Appointment[]>(`getAppointmentAll`,[]))
      );
  }

/**
* Sends a request to the server for a specific Appointment related to an ID
*
* @example
* Simply call the function with an input ID:
* getAppointmentById(1)
*
* @param {number} id The ID that you are searching for
* @returns An Observable with a single Appointment from the database
*/
  getAppointmentById(id : number) : Observable<Appointment>
  {
    return this.http.get<Appointment>(`${this.baseUrl}api/appointments/${id}`)
      .pipe(
        catchError(this.handleError<Appointment>(`getAppointmentById`))
      );
  }

/**
* Sends a request to the server for a specific Appointment related to an input string
*
* @example
* Simply call the function with an input string:
* searchAppointment('Name')
*
* @param {string} term The string that you are searching for
* @returns An Observable with an action result from the server, and any Appointments from the database that contain your input string
*/
  searchAppointment(term: string): Observable<Appointment[]>
  {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Appointment[]>(`${this.baseUrl}api/appointments?search=${term}`).pipe(
      catchError(this.handleError<Appointment[]>('searchAppointment', []))
    );
  }

/**
* Sends a request to the server to create a Appointment
*
* @example
* Call the function with an input Appointment object:
* createAppointment(myObject)
*
* @param {Appointment} appointment The Appointment object that you are trying to add to the database
* @returns An Observable with the action result from the server, and a copy of your created Appointment
*/
  createAppointment(appointment: Appointment)
  {
    return this.http.post<Appointment>(`${this.baseUrl}api/appointments`, appointment)
      .pipe(
        catchError(this.handleError<Appointment[]>(`createAppointment`,[]))
      );;
  }

/**
* Sends a request to the server to update a specific Appointment, it uses the ID of your input object.
*
* @example
* Call the function with an input Appointment object:
* updateAppointment(myObject)
*
* @param {Appointment} appointment The Object with the new values that you are trying to update
* @returns An Observable with a action result from the server, and the updated Appointment from the database
*/
  updateAppointment(appointment: Appointment): Observable<any>
  {
    return this.http.put(`${this.baseUrl}api/appointments/${appointment.AppointmentId}`, appointment, this.httpOptions).pipe(
      catchError(this.handleError<Appointment>('updateAppointment'))
    );
  }

/**
* Sends a request to the server to delete a specific Appointment related to the input ID.
*
* @example
* Simply call the function with an input id:
* deleteAppointment(1)
*
* @param {number} id The ID that you are trying to delete
* @returns An Observable with a action result from the server
*/
  deleteAppointment(id: number)
  {
    return this.http.delete(`${this.baseUrl}api/appointments/${id}`)
      .pipe(
        catchError(this.handleError<Appointment[]>(`deleteAppointment`,[]))
      );;
  }

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ! ******* FACILITY *********
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~

getFacilityAll() : Observable<Facility[]>
{
  return this.http.get<Facility[]>(`${this.baseUrl}api/facilities`)
    .pipe(
      catchError(this.handleError<Facility[]>(`getFacilityAll`,[]))
    );
}

getFacilityById(id : number) : Observable<Facility>
{
  return this.http.get<Facility>(`${this.baseUrl}api/facilities/${id}`)
    .pipe(
      catchError(this.handleError<Facility>(`getFacilityById`))
    );
}

searchFacility(term : string): Observable<Facility[]>
{
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Facility[]>(`${this.baseUrl}api/facilities?search=${term}`).pipe(
    catchError(this.handleError<Facility[]>('searchFacility', []))
  );
}

createFacility(facility : Facility)
{
  return this.http.post<Facility>(`${this.baseUrl}api/facilities`, facility)
    .pipe(
      catchError(this.handleError<Facility[]>(`createFacility`,[]))
    );;
}

updateFacility(facility : Facility): Observable<any>
{
  return this.http.put(`${this.baseUrl}api/facilities/${facility.FacilityId}`, facility, this.httpOptions).pipe(
    catchError(this.handleError<Facility>('updateFacility'))
  );
}

deleteFacility(id: number)
{
  return this.http.delete(`${this.baseUrl}api/facilities/${id}`)
    .pipe(
      catchError(this.handleError<Facility[]>(`deleteFacility`,[]))
    );;
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ! ******* INSURANCE ********
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~

getInsuranceAll() : Observable<Insurance[]>
{
  return this.http.get<Insurance[]>(`${this.baseUrl}api/insurances`)
    .pipe(
      catchError(this.handleError<Insurance[]>(`getInsuranceAll`,[]))
    );
}

getInsuranceById(id : number) : Observable<Insurance>
{
  return this.http.get<Insurance>(`${this.baseUrl}api/insurances/${id}`)
    .pipe(
      catchError(this.handleError<Insurance>(`getInsuranceById`))
    );
}

searchInsurance(term : string): Observable<Insurance[]>
{
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Insurance[]>(`${this.baseUrl}api/insurances?search=${term}`).pipe(
    catchError(this.handleError<Insurance[]>('searchInsurance', []))
  );
}

createInsurance(insurance : Insurance)
{
  return this.http.post<Insurance>(`${this.baseUrl}api/insurances`, insurance)
    .pipe(
      catchError(this.handleError<Insurance[]>(`createInsurance`,[]))
    );;
}

updateInsurance(insurance : Insurance): Observable<any>
{
  return this.http.put(`${this.baseUrl}api/insurances/${insurance.InsuranceId}`, insurance, this.httpOptions).pipe(
    catchError(this.handleError<Insurance>('updateInsurance'))
  );
}

deleteInsurance(id: number)
{
  return this.http.delete(`${this.baseUrl}api/insurances/${id}`)
    .pipe(
      catchError(this.handleError<Insurance[]>(`deleteInsurance`,[]))
    );;
}


// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ! ******* PATIENT *********
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~

getPatientAll() : Observable<Patient[]>
{
  return this.http.get<Patient[]>(`${this.baseUrl}api/patients`)
    .pipe(
      catchError(this.handleError<Patient[]>(`getPatientAll`,[]))
    );
}

getPatientById(id : number) : Observable<Patient>
{
  return this.http.get<Patient>(`${this.baseUrl}api/patients/${id}`)
    .pipe(
      catchError(this.handleError<Patient>(`getPatientById`))
    );
}

searchPatient(term : string): Observable<Patient[]>
{
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Patient[]>(`${this.baseUrl}api/patients?search=${term}`).pipe(
    catchError(this.handleError<Patient[]>('searchPatient', []))
  );
}

createPatient(patient : Patient)
{
  return this.http.post<Patient>(`${this.baseUrl}api/patients`, patient)
    .pipe(
      catchError(this.handleError<Patient[]>(`createPatient`,[]))
    );;
}

updatePatient(patient : Patient): Observable<any>
{
  return this.http.put(`${this.baseUrl}api/patients/${patient.PatientId}`, patient, this.httpOptions).pipe(
    catchError(this.handleError<Patient>('updatePatient'))
  );
}

deletePatient(id: number)
{
  return this.http.delete(`${this.baseUrl}api/patients/${id}`)
    .pipe(
      catchError(this.handleError<Patient[]>(`deletePatient`,[]))
    );;
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ! ******* PROVIDER *********
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~

getProviderAll() : Observable<Provider[]>
{
  return this.http.get<Provider[]>(`${this.baseUrl}api/providers`)
    .pipe(
      catchError(this.handleError<Provider[]>(`getProviderAll`,[]))
    );
}

getProviderById(id : number) : Observable<Provider>
{
  return this.http.get<Provider>(`${this.baseUrl}api/providers/${id}`)
    .pipe(
      catchError(this.handleError<Provider>(`getProviderById`))
    );
}

searchProvider(term : string): Observable<Provider[]>
{
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Provider[]>(`${this.baseUrl}api/providers?search=${term}`).pipe(
    catchError(this.handleError<Provider[]>('searchProvider', []))
  );
}

createProvider(provider : Provider)
{
  return this.http.post<Provider>(`${this.baseUrl}api/providers`, provider)
    .pipe(
      catchError(this.handleError<Provider[]>(`createProvider`,[]))
    );;
}

updateProvider(provider : Provider): Observable<any>
{
  return this.http.put(`${this.baseUrl}api/providers/${provider.ProviderId}`, provider, this.httpOptions).pipe(
    catchError(this.handleError<Provider>('updateProvider'))
  );
}

deleteProvider(id: number)
{
  return this.http.delete(`${this.baseUrl}api/providers/${id}`)
    .pipe(
      catchError(this.handleError<Provider[]>(`deleteProvider`,[]))
    );;
}

// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~
// ! ******* SPECIALTY *********
// ! ~~~~~~~~~~~~~~~~~~~~~~~~~~

getSpecialtyAll() : Observable<Specialty[]>
{
  return this.http.get<Specialty[]>(`${this.baseUrl}api/specialties`)
    .pipe(
      catchError(this.handleError<Specialty[]>(`getSpecialtyAll`,[]))
    );
}

getSpecialtyById(id : number) : Observable<Specialty>
{
  return this.http.get<Specialty>(`${this.baseUrl}api/specialties/${id}`)
    .pipe(
      catchError(this.handleError<Specialty>(`getSpecialtyById`))
    );
}

searchSpecialty(term : string): Observable<Specialty[]>
{
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Specialty[]>(`${this.baseUrl}api/specialties?search=${term}`).pipe(
    catchError(this.handleError<Specialty[]>('searchSpecialty', []))
  );
}

createSpecialty(specialty : Specialty)
{
  return this.http.post<Specialty>(`${this.baseUrl}api/specialties`, specialty)
    .pipe(
      catchError(this.handleError<Specialty[]>(`createSpecialty`,[]))
    );;
}

updateSpecialty(specialty : Specialty): Observable<any>
{
  return this.http.put(`${this.baseUrl}api/specialties/${specialty.SpecialtyId}`, specialty, this.httpOptions).pipe(
    catchError(this.handleError<Specialty>('updateSpecialty'))
  );
}

deleteSpecialty(id: number)
{
  return this.http.delete(`${this.baseUrl}api/specialties/${id}`)
    .pipe(
      catchError(this.handleError<Specialty[]>(`deleteSpecialty`,[]))
    );;
}







  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(operation + " " + error);
      console.error(operation + " " + error);
      return of(result as T);
    };
}
}