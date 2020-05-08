import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { HealthPairService,AuthenticationService} from '../_services';
import { Patient,Provider,Appointment } from '../models';

import { Router} from '@angular/router';

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

  constructor(private HealthPairService: HealthPairService,private authenticationService: AuthenticationService, private formBuilder: FormBuilder,
    private router: Router)
  {
    this.currentPatient = this.authenticationService.CurrentPatientValue;
  }

  ngOnInit(): void
  {
  this.HealthPairService.getProviderById(1)
    .subscribe(prov => this.currentProvider = prov);

  }

    onSubmit(date:Date,time:any)
    {
      var craftedDate = new Date;
      craftedDate.setFullYear(date.getFullYear());
      craftedDate.setMonth(date.getMonth());
      craftedDate.setDate(date.getDate());
      craftedDate.setHours(time.hour);
      craftedDate.setMinutes(time.minute);
      craftedDate.setSeconds(time.second);



      var myAppointment = new Appointment
      {
        myAppointment.appointmentId = 0;
        myAppointment.appointmentDate = craftedDate;
        myAppointment.patientId = this.currentPatient.patientId;
        myAppointment.providerId = this.currentProvider.providerId;
      }
      this.HealthPairService.createAppointment(myAppointment)
        .subscribe();
      console.log(myAppointment);
      this.responseText = "Appointment Successfully Created!";
    }
}
