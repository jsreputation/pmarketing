import {
  Component,
  OnInit
} from '@angular/core';
import { Location } from '@angular/common';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  ConfigService,
  IReward,
  IVoucherService,
  NotificationService,
  RewardsService
} from '@perxtech/core';
import {
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import {
  AnalyticsService,
  PageType
} from '../analytics.service';
import {
  IMacaron,
  MacaronService
} from '../services/macaron.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward: IReward;
  public isButtonEnable: boolean = true;
  public isRewardsDetailsFetched: boolean = false;
  public macaron: IMacaron | null;
  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private notificationService: NotificationService,
    private analyticsService: AnalyticsService,
    private macaronService: MacaronService,
    private configService: ConfigService
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig()
      .pipe(
        switchMap(() => this.activeRoute.queryParams),
        filter((params: Params) => params.id), // ignore anything not related to reward id
        map((params: Params) => params.id), // get reward id
        switchMap((id: number) => this.rewardsService.getReward(id)) // get the full reward information
      )
      .subscribe((reward: IReward) => {
        this.reward = reward;
        if ((window as any).appboy) {
          (window as any).appboy.logCustomEvent(
            'user_view_reward',
            {'reward_id': reward.id, 'reward_name': reward.name}
          );
        }
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
        this.isRewardsDetailsFetched = true;
        if (this.macaron !== null) {
          this.isButtonEnable = this.macaron.isButtonEnabled;
        }

        if (reward.inventory && reward.inventory.rewardLimitPerUserBalance === 0) {
          this.isButtonEnable = false;
        }
      });
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.isButtonEnable = false;
    this.vouchersService.issueReward(this.reward.id)
      .subscribe(
        () => this.router.navigate(['/home/vouchers']),
        () => {
          this.isButtonEnable = true; // change button back to enable which it originally is, before save is triggered
          this.notificationService.addSnack('Sorry! Could not save reward.');
        }
      );
  }
}
