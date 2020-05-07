import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HealthPairService,AuthenticationService} from '../_services';
import { Patient,Provider,Appointment } from '../models';

@Component({
  selector: 'app-appointment-details',
  templateUrl: './appointment-details.component.html',
  styleUrls: ['./appointment-details.component.css']
})
export class AppointmentDetailsComponent implements OnInit
{
  @Input() currentProvider : any;
  currentPatient : any;
  appointmentForm: FormGroup;
  loading = false;
  submitted = false;
  responseText : string;


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
  //   this.appointmentForm = this.formBuilder.group({
  //     DoctorName: ['', Validators.required],
  //     LocationName: ['', Validators.required],
  //     PatientName: ['', Validators.required],
  //     PatientPhoneNumber: ['', [Validators.required, Validators.minLength(9),  Validators.maxLength(12)]],
  //     PatientAddress: ['', Validators.required],
  //     PatientCity: ['', Validators.required],
  //     PatientState: ['', Validators.required],
  //     PatientZipcode: ['', Validators.required],
  //     AppointmentDate: ['', Validators.required],
  //     AppointmentTime: ['', Validators.required],
  // });

  this.HealthPairService.getProviderById(1)
    .subscribe(prov => this.currentProvider = prov);

  }

  // get f() { return this.appointmentForm.controls; }

    onSubmit(date:Date,time:any)
    {
      console.log(this.currentPatient);
      var craftedDate = new Date;
      craftedDate.setFullYear(date.getFullYear());
      craftedDate.setMonth(date.getMonth());
      craftedDate.setDate(date.getDate());
      craftedDate.setHours(time.hour);
      craftedDate.setMinutes(time.minute);
      craftedDate.setSeconds(time.second);

      var myAppointment = new Appointment
      {
        myAppointment.AppointmentId = 0;
        myAppointment.AppointmentDate = craftedDate;
        myAppointment.PatientId = this.currentPatient.patientId;
        myAppointment.ProviderId = this.currentProvider.providerId;
      }
      this.HealthPairService.createAppointment(myAppointment)
        .subscribe();
      this.responseText = "Appointment Successfully Created!";
    }
}
