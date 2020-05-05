import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import {RegisterService} from '../_services/register.service'

import { AlertService, HealthPairService, AuthenticationService } from '../_services';
import { NgForOf } from '@angular/common';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private HealthPairService: HealthPairService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.CurrentPatientValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            PatientFirstName: ['', Validators.required],
            PatientLastName: ['', Validators.required],
            PatientInsurance: ['', Validators.required],
            PatientPassword: ['', [Validators.required, Validators.minLength(6)], Validators.pattern('[a-zA-Z ]*')]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.HealthPairService.createPatient(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  insertRecord(form: NgForm){
    (this.HealthPairService.createPatient(form.value)).subscribe(res=>{this.alertService.success('Success!');})
  }
}
