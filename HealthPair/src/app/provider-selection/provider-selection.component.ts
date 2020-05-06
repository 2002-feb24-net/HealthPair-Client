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
  providers: Provider[];

  choseIns: string;
  choseSpec: string;

  constructor(private APIService: HealthPairService, public SearchService: SearchService) { }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.APIService.getProviderAll().subscribe(providers => this.providers = providers);
  }
  filterbySpecialty() {
    this.APIService.getProviderAll().subscribe(providers => this.providers = providers);
  }
}
