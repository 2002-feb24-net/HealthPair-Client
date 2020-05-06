import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, HealthPairService, AuthenticationService } from '../_services';
import { NgForOf } from '@angular/common';
import { Insurance, Patient } from '../models';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    insurances: Insurance[];
    chosenInsurance: string;
    myInsurance: any;

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
            PatientAddress1: ['', Validators.required],
            PatientCity: ['', Validators.required],
            PatientState: ['', Validators.required],
            PatientZipcode: ['', Validators.required],
            PatientBirthDay: ['', Validators.required],
            PatientPhoneNumber: ['', Validators.required],
            PatientEmail: ['', Validators.required],
            PatientPassword: ['', [Validators.required, Validators.minLength(6)], ]
        });

        this.getAll();
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit(

    ) {
        this.submitted = true;
        this.loading = true;
        this.chosenInsurance = this.registerForm.get('PatientInsurance')?.value;


        this.HealthPairService.getInsuranceByName(this.chosenInsurance)
          .subscribe(insurance => {
            this.myInsurance = insurance;
            console.log(this.myInsurance);
            var myReturnObject: Patient = new Patient

            {
                myReturnObject.InsuranceId = this.myInsurance[0].insuranceId,
                myReturnObject.InsuranceName = this.myInsurance[0].insuranceName,
                myReturnObject.PatientId = 0,
                myReturnObject.PatientFirstName = this.registerForm.value.PatientFirstName,
                myReturnObject.PatientLastName = this.registerForm.value.PatientLastName,
                myReturnObject.PatientAddress1 = this.registerForm.value.PatientAddress1,
                myReturnObject.PatientBirthDay = this.registerForm.value.PatientBirthDay,
                myReturnObject.PatientCity = this.registerForm.value.PatientCity,
                myReturnObject.PatientEmail = this.registerForm.value.PatientEmail,
                myReturnObject.PatientPassword = this.registerForm.value.PatientPassword,
                myReturnObject.PatientPhoneNumber = this.registerForm.value.PatientPhoneNumber,
                myReturnObject.PatientState = this.registerForm.value.PatientState,
                myReturnObject.PatientZipcode = this.registerForm.value.PatientZipcode
            }
            console.log(myReturnObject);
            this.HealthPairService.createPatient(myReturnObject)
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
          })




        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;


        }



    }

    getAll()
    {
      this.HealthPairService.getInsuranceAll()
        .subscribe(insurances =>
        {
          this.insurances = insurances;
        });
    }

}
