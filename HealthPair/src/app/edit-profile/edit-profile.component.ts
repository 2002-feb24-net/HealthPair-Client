import { Component, OnInit } from '@angular/core';
import { HealthPairService} from '../_services/healthpairapi.service';
import {NgForm } from '@angular/forms'
import { Patient} from '../Models'
import { ContentObserver } from '@angular/cdk/observers';
import {AuthenticationService } from '../_services';
import { from } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  currentPatient: any;


  constructor(public service: HealthPairService, private authenticationService: AuthenticationService) { 
    this.authenticationService.CurrentPatient.subscribe(x => this.currentPatient = x);
  }

  ngOnInit(): void {
    // this.resetForm();
  }

  // resetForm(form?: NgForm) {
  //   if(form != null)
  //     form.form.reset();
  //   this.currentPatient = {
  //     PatientId: 0,
  //     PatientFirstName: '',
  //     PatientLastName : '',
  //     PatientPassword : '',
  //     PatientAddress1 : '',
  //     PatientCity : '',
  //     PatientState : '',
  //     PatientZipcode : 0,
  //     PatientBirthDay : new Date(Date.now()),
  //     PatientPhoneNumber : 0,
  //     PatientEmail : '',
  //     IsAdmin : false,
  //     Token : '',
  
  //     InsuranceId : 0,
  //     InsuranceName : ''
  //   }
  // }

  onSubmit(form: NgForm) {
    if(this.currentPatient.patientId == 0) {
      // this.resetForm(form);
      console.log("User does not exist")
    } else {
      this.UpdateRecord(form);
    }
  }

  UpdateRecord(form: NgForm) {
    this.currentPatient = this.authenticationService.CurrentPatient
    this.service.updatePatient(this.currentPatient).subscribe(
      res => {
        // this.resetForm(form);
        console.log("Patient updated");
      },
      error => {
        console.log(error);
      }
    )
  }

}
