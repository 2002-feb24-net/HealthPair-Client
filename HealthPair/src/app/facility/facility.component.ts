import { Component, OnInit, Input } from '@angular/core';
import { HealthPairService,AuthenticationService} from '../_services';
import { Facility } from '../models';

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.css']
})
export class FacilityComponent implements OnInit {

  currentPatient : any;
  facility : Facility;
  myFacilities : Facility[];
  createdMessage : string;
  highest: number;

  constructor(private HealthPairService: HealthPairService,private authenticationService: AuthenticationService) { this.currentPatient = this.authenticationService.CurrentPatientValue; }

  ngOnInit()
  {
    this.getHighestFacilityId();
  }

  add(FacilityName : string, FacilityAddress1 : string, FacilityCity : string, FacilityState : string, FacilityZipcode : number, FacilityPhoneNumber : number): void
  {
    let facility = new Facility
    {
      facility.FacilityName = FacilityName,
      facility.FacilityAddress1 = FacilityAddress1,
      facility.FacilityCity = FacilityCity,

    }
    this.HealthPairService.createFacility(facility)
      .subscribe(review => {
        review.ReviewId=this.highest+1,
        review.Rating=reviewRating,
        review.Username=this.currentUser.username,
        this.game.Reviews.push(review)
      });

    this.createdMessage = "Your review has been created!";

  }

  delete(review: Review): void {
    this.game.Reviews = this.game.Reviews.filter(r => r !== review);
    this.PACGamesService.deleteReview(review).subscribe();
  }

  getHighestReviewId()
  {
    this.PACGamesService.getReviews()
      .subscribe(reviews => {
        this.myReviews = reviews,
        this.highest = this.myReviews[this.myReviews.length-1].ReviewId;
      });
  }

}
