import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService, RewardsService, IProfile } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;
  public subTitleFn: (loyalty: ILoyalty) => string;
  public titleFn: (profile: IProfile) => string;
  public rewards$: Observable<IReward[]>;
  public summaryExpiring: string;
  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService,
    private translate: TranslateService,
    private rewardsService: RewardsService
  ) {
  }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.rewardsService.getAllRewards(['featured']).subscribe((rewards) => {
      this.rewards$ = of(rewards);
    });
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => {
          this.loyalty = loyalty;
          this.expiringPointsString(loyalty);
        });
    this.translate.get('YOU_HAVE')
      .subscribe((res: string) => {
        this.subTitleFn = () => res;
      });
    this.translate.get('HELLO')
      .subscribe((res: string) => {
        this.titleFn = () => res;
      });

  }

  private expiringPointsString(loyalty: ILoyalty): void {
    if (!loyalty || !loyalty.expiringPoints || !loyalty.expiringPoints.length || !loyalty.expiringPoints[0]) {
      return;
    }
    const { points, expireDate } = loyalty.expiringPoints[0];
    if (!points || !expireDate) {
      return;
    }
    this.translate.get('POINTS_EXPITING', { points, date: expireDate }).subscribe((val) => {
      this.summaryExpiring = val;
    });
  }
}
