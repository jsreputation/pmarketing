import { Component } from '@angular/core';
import { ICampaign, CAMPAIGN_STATE, CAMPAIGN_TYPE } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public campaigns: ICampaign[] = [
    {
      id: 1,
      name: 'Smash that Pinata',
      description: '',
      type: CAMPAIGN_TYPE.stamp,
      state: CAMPAIGN_STATE.active
    },
    {
      id: 2,
      name: 'Smash that Pinata',
      description: '',
      type: CAMPAIGN_TYPE.stamp,
      state: CAMPAIGN_STATE.active
    },
    {
      id: 3,
      name: 'Smash that Pinata',
      description: '',
      type: CAMPAIGN_TYPE.stamp,
      state: CAMPAIGN_STATE.active
    },
    {
      id: 4,
      name: 'Smash that Pinata',
      description: '',
      type: CAMPAIGN_TYPE.stamp,
      state: CAMPAIGN_STATE.active
    },
    {
      id: 5,
      name: 'Smash that Pinata',
      description: '',
      type: CAMPAIGN_TYPE.stamp,
      state: CAMPAIGN_STATE.active
    }
  ];  // test Array

  constructor(private router: Router) { }

  public onCampaignSelect(campaign: ICampaign): void {
    this.router.navigate([`/game-play/${campaign.id}`]);
  }
}
