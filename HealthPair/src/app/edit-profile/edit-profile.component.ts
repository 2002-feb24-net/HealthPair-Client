import { Component, OnInit } from '@angular/core';
import { HealthPairService} from '../_services/healthpairapi.service';
import {NgForm } from '@angular/forms'
import { Patient} from '../Models'
import { ContentObserver } from '@angular/cdk/observers';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentPatitent: Patient;


  constructor(public service: HealthPairService) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if(form != null)
      form.form.reset();
    this.currentPatitent = {
      PatientId: 0,
      PatientFirstName: '',
      PatientLastName : '',
      PatientPassword : '',
      PatientAddress1 : '',
      PatientCity : '',
      PatientState : '',
      PatientZipcode : 0,
      PatientBirthDay : new Date(Date.now()),
      PatientPhoneNumber : 0,
      PatientEmail : '',
      IsAdmin : false,
      Token : '',
  
      InsuranceId : 0,
      InsuranceName : ''
    }
  }

  onSubmit(form: NgForm) {
    if(this.service.defaultUserId == 0) {
      this.resetForm(form);
      console.log("User does not exist")
    } else {
      this.UpdateRecord(form);
    }
  }

  UpdateRecord(form: NgForm) {
    this.service.updatePatient(this.currentPatitent).subscribe(
      res => {
        this.resetForm(form);
        console.log("Patient updated");
      },
      error => {
        console.log(error);
      }
    )
  }

}
