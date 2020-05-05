import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserLocationService } from '../user-location.service';

import { HealthPairService,AuthenticationService} from '../_services';
import { Insurance, Patient } from '../models';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  chosenInsurance: string;
  specialty: string;

  //Get longitude and latitude
  lat:string = '';
  long:string = '';
  city:string = '';
  state:string = '';
  zip:number = 0;

  //Hold an instance of the user-loaction service
  location: Object;
  
  insurances: Insurance[];
  currentPatient : Patient;


  landingpageForm = this.builder.group({
    insurance: ['Humana'],
    specialty: ['Optometry']
  })
  constructor(private builder: FormBuilder, private userLocation: UserLocationService, private HealthPairService: HealthPairService,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.currentPatient = this.authenticationService.CurrentPatientValue;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo);
      this.userLocation.getLocation();
    } else {
    }
    this.getAll();
  }

  onSubmit() {
    this.chosenInsurance = this.landingpageForm.get('insurance')?.value;
    this.specialty = this.landingpageForm.get('specialty')?.value;
  }

   displayLocationInfo(position) {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
  
    console.log(`longitude: ${ lng } | latitude: ${ lat }`);
  }

  getAll()
  {
    this.HealthPairService.getInsuranceAll()
      .subscribe(insurances =>
      {
        this.insurances = insurances;
      });
    }
}
