import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

import { Patient } from "../models"
import { AlertService } from '../_services';


@Injectable({
  providedIn: 'root'
})
export class HealthPairService
{
  private baseUrl = environment.healthPairApiBaseUrl;

  get defaultUserId() { return 0; }

  constructor(private http: HttpClient, private alertService: AlertService) { }

  register(patient: Patient) {
    return this.http.post(`${this.baseUrl}api/patients`, patient)
      .pipe(
        catchError(this.handleError<Patient[]>(`register`,[]))
      );
  }

  httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.alertService.error(error);
      console.error(error);
      return of(result as T);
    };
}
}