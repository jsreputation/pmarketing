import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Utils from '@cl-helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class CampaignCreationStoreService {
  public currentCampaign$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  public set currentCampaign(value: any) {
    this.currentCampaign$.next(value);
  }

  public get currentCampaign(): any {
    return this.currentCampaign$.value ? this.currentCampaign$.value : {};
  }

  public updateCampaign(value: any) {
    if ('rewards' in value) {
      this.currentCampaign.rewards = value.rewards;
    }
    this.currentCampaign = Utils.nestedObjectAssign(this.currentCampaign, value);
    console.log(this.currentCampaign);
  }

}
