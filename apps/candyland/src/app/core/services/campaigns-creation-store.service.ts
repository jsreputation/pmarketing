import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Utils from '@cl-helpers/utils';

@Injectable({
  providedIn: 'root'
})
export class CampaignCreationStoreService {
  private currentCampaign$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {
  }

  public set currentCampaign(value: any) {
    this.currentCampaign$.next(value);
  }

  public get currentCampaign(): any {
    return this.currentCampaign$.value;
  }

  public updateCampaign(value: any) {
    this.currentCampaign = Utils.nestedObjectAssign(this.currentCampaign, value);
  }

}
