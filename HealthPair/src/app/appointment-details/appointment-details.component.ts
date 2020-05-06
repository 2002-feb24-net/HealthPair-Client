import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HealthPairService,AuthenticationService} from '../_services';
import { Patient,Provider } from '../models';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit
{
  @Input() currentProvider : Provider;
  currentPatient : any;
  appointmentForm: FormGroup;
  loading = false;
  submitted = false;


  title = 'test';
  date = new FormControl(new Date());
  time = { hour: 12, minute: 0, second: 0 };
  meridian = true;
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  constructor(private HealthPairService: HealthPairService,private authenticationService: AuthenticationService, private formBuilder: FormBuilder)
  {
    this.currentPatient = this.authenticationService.CurrentPatientValue;
  }

  ngOnInit(): void
  {
    this.appointmentForm = this.formBuilder.group({
      DoctorName: ['', Validators.required],
      LocationName: ['', Validators.required],
      PatientName: ['', Validators.required],
      PatientPhoneNumber: ['', [Validators.required, Validators.minLength(9),  Validators.maxLength(12)]],
      PatientAddress: ['', Validators.required],
      PatientCity: ['', Validators.required],
      PatientState: ['', Validators.required],
      PatientZipcode: ['', Validators.required],
      AppointmentDate: ['', Validators.required],
      AppointmentTime: ['', Validators.required],
  });
  }

  get f() { return this.appointmentForm.controls; }

  //note: all inputs are going to be strings based on the way its currently being pulled
  submitAppointment()
    {
      console.log("submitted");
      console.log(this.appointmentForm.value);
      this.submitted = true;

      // stop here if form is invalid
      if (this.appointmentForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.appointmentForm.value.AppointmentDate);
    }

    onSubmit()
    {
      console.log("submitted");
    }

}
