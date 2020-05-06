import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { HealthPairService,AuthenticationService,UserLocationService } from '../_services';
import { Insurance, Patient } from '../models';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  chosenInsurance: string;
  specialty: string;

  insurances: Insurance[];
  currentPatient : Patient;

  yourLocation : string;
  destinationLocation : string;
  finalDistance : string;


  landingpageForm = this.builder.group({
    insurance: ['Humana'],
    specialty: ['Optometry']
  })
  constructor(private builder: FormBuilder, private HealthPairService: HealthPairService,private authenticationService: AuthenticationService, private locationService: UserLocationService) { }

  ngOnInit(): void {
    this.currentPatient = this.authenticationService.CurrentPatientValue;
    this.getAll();
  }

  onSubmit() {
    this.chosenInsurance = this.landingpageForm.get('insurance')?.value;
    this.specialty = this.landingpageForm.get('specialty')?.value;
  }

  getAll()
  {
    this.HealthPairService.getInsuranceAll()
      .subscribe(insurances =>
      {
        this.insurances = insurances;
      });
  }

  getCurrentLocation() {
    this.yourLocation = "Your Location: Calculating...";
    return this.locationService.getMyPosition()
      .then(pos => {
        console.log(`Position: ${pos.lng} ${pos.lat}`);
        const myReturn = [pos.lng, pos.lat];
        this.yourLocation = "Your Location: Longitude: " + myReturn[0] + " Latitude: " + myReturn[1];
        return myReturn;
      });
  }
  getTargetLocation(address: string, city: string, state: string) {
    this.destinationLocation = "Destination: Calculating...";
    return this.locationService.getLocationCoords(address, city, state)
      .toPromise()
      .then(coords => {
        this.Log("Latitude: " + coords.results[0].geometry.location.lat)
        this.Log("Longitude: " + coords.results[0].geometry.location.lng)
        const myReturn = [coords.results[0].geometry.location.lng, coords.results[0].geometry.location.lat];
        this.destinationLocation = "Destination: Longitude: " + myReturn[0] + " Latitude: " + myReturn[1];
        return myReturn;
      });
  }
  calculateDistance(address: string, city: string, state: string) {
    const promises = [this.getCurrentLocation(), this.getTargetLocation(address, city, state)];
    this.finalDistance = "Distance: Calculating...";
    return Promise.all(promises)
      .then(locations => {
        const lon1 = locations[0][0];
        const lat1 = locations[0][1];
        const lon2 = locations[1][0];
        const lat2 = locations[1][1];
        const p = 0.017453292519943295;    // Math.PI / 180
        const c = Math.cos;
        const a = 0.5 - c((lat2 - lat1) * p) / 2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p)) / 2;
        this.finalDistance = "Distance: " + Math.round(12742 * Math.asin(Math.sqrt(a))) + " KMs.";
        return Math.round(12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
      });
  }

  Log(input : any)
  {
    console.log(input);
  }
}
