import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserLocationService } from '../user-location.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  insurance: string;
  specialty: string;

  //Get longitude and latitude
  lat:string = '';
  long:string = '';

  //Hold an instance of the user-loaction service
  location: Object;
  
  landingpageForm = this.builder.group({
    insurance: ['Humana'],
    specialty: ['Optometry']
  })
  constructor(private builder: FormBuilder, private userLocation: UserLocationService) { }

  ngOnInit(): void {
    //Calls the servce when it the component loads
    this.userLocation.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.latitude;
      this.long = data.longitude;
    })
  }

  onSubmit() {
    this.insurance = this.landingpageForm.get('insurance')?.value;
    this.specialty = this.landingpageForm.get('specialty')?.value;
  }

}
