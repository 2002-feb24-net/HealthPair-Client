import { Component, OnInit } from '@angular/core';
import { Patient, Appointment} from '../models';
import {AuthenticationService, HealthPairService} from "../_services"
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  currentPatient:any;
  appointments: Appointment[] = [];
  appointment: Appointment;


  constructor(public service: HealthPairService, private authenticationService: AuthenticationService)
  {
    this.authenticationService.CurrentPatient.subscribe(x => this.currentPatient = x);
  }

  ngOnInit()
  {
    this.GetAppointmentByCurrentUser();
  }

  GetAppointmentByCurrentUser()
  {
    return this.service.getAppointmentAll()
      .subscribe(appointments => {
      this.appointments = appointments
      this.appointments = this.appointments.sort((a, b) => (a.appointmentDate > b.appointmentDate) ? 1 : -1)})
  };

    CancelAppointment(appointment : Appointment)
    {
      this.appointments = this.appointments.filter(r => r !== appointment);
      return this.service.deleteAppointment(appointment.appointmentId).subscribe()
    }
}
