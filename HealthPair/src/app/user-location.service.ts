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
    var currentPosstion = position.longitude + " "  + position.longitude;

    var request = {
      location: currentPosstion,
      radius: '500',
      type: ['hospital']
    };

    var service = new google.maps.places.PlacesServiceStatus();
    service.nearbySearch(request, this.callback)
  }

  callback(results, status) {
    if(status == google.maps.places.PlacesServiceStatus.OK) {
      for(var i = 0; i < results.length; ++i) {
        console.log(results);
      }
    }
  }
}
