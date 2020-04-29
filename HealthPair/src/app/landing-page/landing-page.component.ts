import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  insurance: string;
  specialty: string;
  
  landingpageForm = this.builder.group({
    insurance: ['Humana'],
    specialty: ['Optometry']
  })
  constructor(private builder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.insurance = this.landingpageForm.get('insurance')?.value;
    this.specialty = this.landingpageForm.get('specialty')?.value;
  }

}
