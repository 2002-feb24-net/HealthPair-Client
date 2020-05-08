import { Component, OnInit } from '@angular/core';
import { HealthPairService } from '../_services/healthpairapi.service';
import { Provider } from '../models';
import { SearchService } from '../_services/search.service';

@Component({
  selector: 'app-provider-selection',
  templateUrl: './provider-selection.component.html',
  styleUrls: ['./provider-selection.component.css']
})
export class ProviderSelectionComponent implements OnInit {
  imgurl = 'https://cdn4.iconfinder.com/data/icons/linecon/512/photo-512.png';
  initialProviders: Provider[];
  finalProviders: Provider[];

  stringIns: string;

  constructor(private APIService: HealthPairService, public SearchService: SearchService) { }
  ngOnInit(): void {
    this.initialProviders = [];
    this.finalProviders = [];
    console.log(this.SearchService.sharedIns)
    if (this.SearchService.sharedIns) {
      this.getInsuranceByName().then(myID => this.getAll(myID)); 
    }
  }

  getInsuranceByName() {
    console.log(this.stringIns)
    return this.APIService.searchInsurance(this.SearchService.sharedIns).toPromise().then(insurance => {
      console.log(insurance[0].insuranceId)
      return insurance[0].insuranceId
    })
  }


    getAll(id: number) {
    this.APIService.getProviderAll().subscribe(providers => {
      this.initialProviders = providers;
      console.log(this.initialProviders)
      console.log(id);
      for (var i: number = 0; i < this.initialProviders.length; i++) {
        if (this.initialProviders[i].insuranceIds.includes(id) && this.initialProviders[i].specialty.includes(this.SearchService.sharedSpec)) {
          this.finalProviders.push(this.initialProviders[i]);
          console.log(this.finalProviders)
        }
      }
    });
  }
}
