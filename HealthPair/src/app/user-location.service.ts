import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

//Cerate an interface for location to store longitude nd latitude
interface Location {
  latitude:string;
  longitude:string;
}

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor(private http: HttpClient) { }

  getLocation() {
    return this.http.get<Location>('https://ipapi.co/json/')
  }
}
