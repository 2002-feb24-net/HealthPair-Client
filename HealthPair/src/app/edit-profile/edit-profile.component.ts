import { Component, OnInit } from '@angular/core';
import { HealthPairService} from '../_services/healthpairapi.service';
import {NgForm, FormGroup, FormControl, Validators } from '@angular/forms'
import { Patient} from '../models'
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
  editProfile:FormGroup;
  ngForm: NgForm;


  constructor(public service: HealthPairService, private authenticationService: AuthenticationService) { 
    this.authenticationService.CurrentPatient.subscribe(x => this.currentPatient = x);
  }

  ngOnInit(): void {
    this.editProfile = new FormGroup ({
      'patientPassword' : new FormControl(this.currentPatient.patientPassword, 
        [Validators.required])
    })
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

  get f() {
    return this.editProfile.controls;
  }

  onSubmit(form: any) {
    if(this.currentPatient.patientId == 0) {
      // this.resetForm(form);
      console.log("User does not exist")
    } else {
      console.log(form._directives);
      this.UpdateRecord(form._directives);
    }
  }

  UpdateRecord(form: any) {
    var newPatient : Patient = new Patient 
    {
      newPatient.patientId = form[0].viewModel,
      newPatient.patientFirstName = form[1].viewModel,
      newPatient.patientLastName = form[2].viewModel,
      newPatient.patientEmail = form[3].viewModel,
      newPatient.patientPassword = form[4].viewModel,
      newPatient.patientAddress1 = form[5].viewModel,
      newPatient.patientCity  = form[6].viewModel,
      newPatient.patientState = form[7].viewModel,
      newPatient.patientZipcode = form[8].viewModel,
      newPatient.patientPhoneNumber = form[9].viewModel,
      newPatient.patientBirthDay = form[10].viewModel,
      newPatient.insuranceId = form[11].viewModel,
      newPatient.insuranceName = form[12].viewModel
      newPatient.isAdmin = form[13].viewModel
      
    };
    console.log(newPatient);

    this.service.updatePatient(newPatient).subscribe(
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
