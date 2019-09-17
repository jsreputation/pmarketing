import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RewardsService, NotificationService } from '@perx/core';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { IReward } from '@perx/core';
import { AnalyticsService, PageType } from '../analytics.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public rewardId: number;
  public isButtonEnable: boolean = true;
  public isRewardsDetailsFetched: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private notificationService: NotificationService,
    private analyticsService: AnalyticsService
  ) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id), // ignore anything not related to reward id
        map((params: Params) => params.id), // get reward id
        tap((id: number) => this.rewardId = id), // save it
        switchMap((id: number) => this.rewardsService.getReward(id)) // get the full reward information
      )
      .subscribe((reward: IReward) => {
        if (reward.categoryTags && reward.categoryTags.length > 0) {
          const category = reward.categoryTags[0].title;
          this.analyticsService.addEvent({
            pageName: `rewards:discover:${category}:${reward.name}`,
            pageType: PageType.detailPage,
            siteSectionLevel2: 'rewards:discover',
            siteSectionLevel3: `rewards:discover:${category}:${reward.name}`
          });
        }
        // this.analyticsService.addEvent({});
        // if there is no more personnal inventory for this user disable the button
        if (reward.inventory && reward.inventory.rewardLimitPerUserBalance === 0) {
          this.isButtonEnable = false;
        }
      });
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
    this.isRewardsDetailsFetched = true;
    this.isButtonEnable = isEnable && this.isButtonEnable;
  }
}
