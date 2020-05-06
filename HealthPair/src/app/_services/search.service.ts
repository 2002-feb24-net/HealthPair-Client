import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public choseIns = new BehaviorSubject('none selected');
  sharedIns = this.choseIns.asObservable();
  static sharedIns: any;

  public choseSpec = new BehaviorSubject('none selected');
  sharedSpec = this.choseSpec.asObservable();
  static sharedSpec: any;

  constructor() { }

  setIns(choseIns: string) {
    this.choseIns.next(choseIns)
  }
  setSpec(choseSpec: string) {
    this.choseSpec.next(choseSpec)
  }
}
