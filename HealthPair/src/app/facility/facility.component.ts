import { Component, OnInit, Input } from '@angular/core';
import { HealthPairService,AuthenticationService} from '../_services';
import { Facility } from '../models';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {

  currentPatient : any;
  facility : Facility;
  myFacilities : Facility[];
  createdMessage : string;
  highest: number;

  constructor(private HealthPairService: HealthPairService,private authenticationService: AuthenticationService)
  {
    this.currentPatient = this.authenticationService.CurrentPatientValue;
    this.getHighestFacilityId();
    this.myFacilities = [];
  }

  ngOnInit()
  {
    this.getHighestFacilityId();
  }

  add(FacilityName : string, FacilityAddress1 : string, FacilityCity : string, FacilityState : string, FacilityZipcode : number, FacilityPhoneNumber : number): void
  {
    let facility = new Facility
    {
      facility.FacilityName = FacilityName,
      facility.FacilityAddress1 = FacilityAddress1,
      facility.FacilityCity = FacilityCity,
      facility.FacilityState = FacilityState,
      facility.FacilityZipcode = FacilityZipcode,
      facility.FacilityPhoneNumber = FacilityPhoneNumber
    }
    this.HealthPairService.createFacility(facility)
      .subscribe(myFacility => {
        this.myFacilities.push(myFacility)
      });

    this.createdMessage = "Your facility has been created!";

  }

  delete(facility: Facility): void {
    this.myFacilities = this.myFacilities.filter(r => r !== facility);
    this.HealthPairService.deleteFacility(facility.FacilityId).subscribe();
  }

  getHighestFacilityId()
  {
    this.HealthPairService.getFacilityAll()
      .subscribe(facilities => {
        this.myFacilities = facilities,
        this.highest = this.myFacilities[this.myFacilities.length-1].FacilityId;
      });
  }

}
