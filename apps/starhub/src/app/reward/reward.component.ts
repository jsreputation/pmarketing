import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RewardsService, NotificationService, IVoucherService } from '@perx/core';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { IReward } from '@perx/core';
import { AnalyticsService, PageType } from '../analytics.service';
import { IMacaron, MacaronService } from '../services/macaron.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward: IReward;
  public rewardId: number;
  public isButtonEnable: boolean = true;
  public isRewardsDetailsFetched: boolean = false;
  public macaron: IMacaron;
  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private notificationService: NotificationService,
    private analyticsService: AnalyticsService,
    private macaronService: MacaronService
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
        this.reward = reward;
        if (reward.categoryTags && reward.categoryTags.length > 0) {
          const category = reward.categoryTags[0].title;
          this.analyticsService.addEvent({
            pageName: `rewards:discover:${category.toLowerCase()}:${reward.name}`,
            pageType: PageType.detailPage,
            siteSectionLevel2: 'rewards:discover',
            siteSectionLevel3: `rewards:discover:${category.toLowerCase()}`
          });
        }
        
        this.macaron = this.macaronService.getMacaron(reward);
        console.log(this.macaron, reward)
        if (reward.inventory && reward.inventory.rewardLimitPerUserBalance === 0 || this.macaron !== null) {
          this.isButtonEnable = false;
        }
      });
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.vouchersService.issueReward(this.rewardId)
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
