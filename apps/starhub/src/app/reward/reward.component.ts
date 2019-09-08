import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RewardsService, NotificationService } from '@perx/core';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public rewardId: number;
  public isButtonEnable: boolean = false;
  public isComingSoon: boolean = false;
  public isRewardLoaded: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      ((params: Params) => {
      if (params.id) {
        this.rewardId = params.id;
      }
    }));
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.rewardsService.issueReward(this.rewardId)
      .subscribe(
        () => this.router.navigate(['/home/vouchers']),
        () => this.notificationService.addSnack('Sorry! Could not save reward.')
    );
  }

  public setButton(isEnable: boolean): void {
    this.isButtonEnable = isEnable;
  }
}
