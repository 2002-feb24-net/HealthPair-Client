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
    var process:any;
    var distance = require('google-distance-matrix');
    var currentPosstion = position.longitude + " "  + position.longitude;
    var origin = ['Arlington', currentPosstion ]
    var destination = [ 'New York NY', '41.8337329,-87.7321554' ]

    distance.key(process.env.API_KEY);
    distance.units('imperial');

    distance.matrix(origin, destination, function(error, distance) {
      if (error) {
        return console.log(error);
      }
      if(!distance) {
        return console.log('no distances');
    }

    if(distance.status == 'OK') {
      for(var a = 0; a < origin.length; a++) {
        for(var b = 0; b < distance.length; b++) {
          var origin = distance.origin_addresses[a];
          var destination  = distance.destination_addresses[b];

          if(distance.row[0].element[b].status == 'OK') {
            var distance = distance.rows[a].element[b].distance.text;
            alert('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
          } else {
            alert(destination + ' is not reachable by land from ' + origin);
          }
        }
      }
    }
    })
  }
}
