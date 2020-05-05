import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Patient } from '../models';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  formdata: Patient;
  private baseUrl = environment.healthPairApiBaseUrl;

  constructor(private _http: HttpClient) { }

postPatients(formdata: Patient){
  return this._http.post(this.baseUrl + '/Patient', formdata);
}



addPatient(patient: Patient) {
  console.log(patient);
  return this._http.post<Patient>(
    this.baseUrl,JSON.stringify(Patient),httpOptions).toPromise();

 }
}
