import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AlertService } from '../_services/alert.service';
import { Location } from '../models';

//Create an interface for location to store longitude and latitude

@Injectable({
  providedIn: 'root'
})
export class UserLocationService
{
  private baseUrl = environment.geoLocationBaseUrl;
  key: string = 'AIzaSyCC8iBCJi0HNtZaFi-KCObb8QyrKY2TkxM';
  exampleLocation = '1600 Amphitheatre Parkway, Mountain View, CA';

  constructor(private http: HttpClient, private alertService: AlertService) { }

  httpOptions =
  {
    headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  };

  getMyPosition(): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      navigator.geolocation.getCurrentPosition(resp =>
        {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err =>
        {
          // TODO: Error handling
          reject(err);
        });
    });
  }

  getLocationCoordsDemo()
  {
    return this.http.get<any>(`${this.baseUrl}1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=${this.key}`)
      .pipe(
        catchError(this.handleError<any>(`getLocationCoords`))
      );
  }

  getLocationCoords(address1 : string, city : string, state : string)
  {
    address1 = this.FormatLocationString(address1);
    city = this.FormatLocationString(city);
    var finalString = address1+",+"+city+",+"+state;
    return this.http.get<any>(`${this.baseUrl}${finalString}&key=${this.key}`)
  }

  FormatLocationString(input : string) : string
  {
    var inputArray = input.split(" ");
    input = inputArray[0];
    for (var i : number = 1; i<inputArray.length;i++)
    {
      input = input+"+"+inputArray[i];
    }
    return input;
  }

  /**
  * Catches errors that are piped into it, and gives them to the alert service as well as prints them to the console logs.
  *
  * @param {string} operation The method/operation that threw the error
  * @param {Observable<T>} result The Observable returned that threw the error. This can also include status codes from the server.
  * @returns A function that print the error to alert service and console, and then return an Observable with a action result from the server
  */
  private handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      this.alertService.error(operation + " " + error);
      console.error(operation + " " + error);
      return of(result as T);
    };
  }
}
