import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AgmCoreModule } from '@agm/core/'
import { google } from '@agm/core/services/google-maps-types';

//Create an interface for location to store longitude and latitude
interface Location
{
  latitude:string;
  longitude:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserLocationService
{
  key: string = 'AIzaSyCC8iBCJi0HNtZaFi-KCObb8QyrKY2TkxM';

  constructor(private http: HttpClient) { }

  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) =>
    {
      navigator.geolocation.getCurrentPosition(resp =>
        {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err =>
        {
          reject(err);
        });
    });
  }
}
