import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { HealthPairService,AuthenticationService,UserLocationService} from '../_services';
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

  testGetLocation()
  {
    this.locationService.getPosition().then(pos=>
    {
         console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }
}
