import { Component, OnInit } from '@angular/core';
import { Patient, Appointment} from '../models';
import {AuthenticationService, HealthPairService} from "../_services"

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  currentPatient:any;
  appointments: Appointment[] = [];


  constructor(public service: HealthPairService, private authenticationService: AuthenticationService) {
    this.authenticationService.CurrentPatient.subscribe(x => this.currentPatient = x);
  }

  ngOnInit() {
    this.GetAppointmentByCurrentUser();
  }

  GetAppointmentByCurrentUser() {
    return this.service.getAppointmentAll()
    .subscribe(appointments =>
      this.appointments = appointments
      )};

}
