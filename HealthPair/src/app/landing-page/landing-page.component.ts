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

  testMessage : string;

  location1 : number[];
  location2 : number[];


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

  GetCurrentLocation()
  {
    var myReturn : number[];
    this.locationService.getMyPosition().then(pos=>
    {
      console.log(`Position: ${pos.lng} ${pos.lat}`);
      myReturn = [pos.lng, pos.lat];
      this.testMessage = "Longitude: " + myReturn[0] + " Latitude: " + myReturn[1];
      this.location1 = myReturn;
    })
  }

  GetTargetLocation(address : string, city : string, state : string)
  {
    var myReturn : number[];
    this.locationService.getLocationCoords(address,city,state)
      .subscribe(coords => {
        this.Log("Latitude: " + coords.results[0].geometry.location.lat)
        this.Log("Longitude: " + coords.results[0].geometry.location.lng)
        myReturn = [coords.results[0].geometry.location.lng,coords.results[0].geometry.location.lat];
        this.testMessage = "Longitude: " + myReturn[0] + " Latitude: " + myReturn[1];
        this.location2 = myReturn;
      });
  }

  CalculateDistance(address : string, city : string, state : string)
  {
    this.GetCurrentLocation();
    this.GetTargetLocation(address,city,state);
    var lon1 = this.location1[0];
    var lat1 = this.location1[1];
    var lon2 = this.location2[0];
    var lat2 = this.location2[1];
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    this.testMessage = "You are " + 12742 * Math.asin(Math.sqrt(a)) + " KM away.";
    console.log("You are " + 12742 * Math.asin(Math.sqrt(a)) + " KMs away.");
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  Log(input : any)
  {
    console.log(input);
  }
}
