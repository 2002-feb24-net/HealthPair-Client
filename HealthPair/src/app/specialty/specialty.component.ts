import { Component, OnInit } from '@angular/core';
import { HealthPairService,AuthenticationService} from '../_services';
import {Specialty, Patient} from '../models'

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.css']
})
export class SpecialtyComponent implements OnInit {
  currentPatient : Patient;
  specialty : Specialty;
  mySpecialties : Specialty[];
  createdMessage : string;
  highest: number;

  constructor(private HealthPairService: HealthPairService,private authenticationService: AuthenticationService) {
    this.currentPatient = this.authenticationService.CurrentPatientValue;
    // this.getHighestInsuranceId();
    this.mySpecialties = [];
  }

  ngOnInit() {
  }

  AddSpecialty(specialty: string) {
    let newSpecialty = new Specialty
    {
      newSpecialty.Specialty = specialty
    }
    this.HealthPairService.createSpecialty(newSpecialty)
    .subscribe(mySpecialty => {
      this.mySpecialties.push(mySpecialty)
    });
    
    this.createdMessage = "Your specialty has been created!"
  }

  delete(specialty: Specialty): void {
    this.mySpecialties = this.mySpecialties.filter(r => r !== specialty);
    this.HealthPairService.deleteFacility(specialty.SpecialtyId).subscribe();
  }
  getHighestSpecialtyId()
  {
    this.HealthPairService.getSpecialtyAll()
      .subscribe(specialties => {
        this.mySpecialties = specialties,
        this.highest = this.mySpecialties[this.mySpecialties.length-1].SpecialtyId;
      });
  }
}
