import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AgmCoreModule } from '@agm/core/'
import { google } from '@agm/core/services/google-maps-types';

//Cerate an interface for location to store longitude nd latitude
interface Location {
  latitude:string;
  longitude:string;
  city:string;
  region:string;
  postal:number;

}

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor(private http: HttpClient) { }

  getLocation() {
    if(navigator.geolocation)
    {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
    else {
      alert("Browser doesn't supoort")
    }
  }

  

  showPosition(position) {
    var distance = require('google-distance-matrix');

    var currentPosstion = position.longitude + " "  + position.longitude;
    var origin = [currentPosstion];
    var destinations = ['Moline', '41.5067, 90.5151']

    distance.matrix(origin, destinations, function (err, distances) {
      if (!err)
          console.log(distances);
  })


}
}
