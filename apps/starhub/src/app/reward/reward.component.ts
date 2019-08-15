import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IReward } from '@perx/core';
import { rewards } from '../rewards.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent {
  public reward: IReward;

  constructor(private location: Location, private router: Router) {
    this.reward = rewards[0];
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.router.navigate(['/home/vouchers']);
  }
}
