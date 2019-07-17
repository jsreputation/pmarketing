import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampaignCreationStoreService {
  public currentCampaign$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public config = {
    typeFilterConfig: [
      {title: 'All', value: null},
      {title: 'Survey', value: 'Survey'},
      {title: 'Stamp', value: 'Stamp'},
      {title: 'Game', value: 'Game'},
      {title: 'Instant Reward', value: 'Instant Reward'}
    ],
    durationLimits: [
      {title: 'Day', value: 'day'},
      {title: 'Week', value: 'week'},
      {title: 'Month', value: 'month'},
    ],
    days: [
      {title: 'S', value: 'sunday'},
      {title: 'M', value: 'monday'},
      {title: 'T', value: 'tuesday'},
      {title: 'W', value: 'wednesday'},
      {title: 'T', value: 'thursday'},
      {title: 'F', value: 'friday'},
      {title: 'S', value: 'Saturday'},
    ],
    shortcodes: [
      {title: 'Campaign Url', value: '[campaignUrl]'},
      {title: 'User ID', value: '[userId]'},
      {title: 'First name', value: '[userFirstName]'},
      {title: 'Last name', value: '[userLastName]'},
    ]
  };


  constructor() {
  }

  public set currentCampaign(value) {
    this.currentCampaign$.next(value);
  }

  public get currentCampaign(): any {
    return this.currentCampaign$.value ? this.currentCampaign$.value : {};
  }

  public updateCampaign(value: any) {
    if ('rewards' in value) {
      this.currentCampaign.rewards = value.rewards;
    }
    this.currentCampaign = Object.assign(this.currentCampaign, value);
  }

}
