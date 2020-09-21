import { Component, OnInit } from '@angular/core';
import {
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  IFlags,
  IReward,
  SettingsService
} from '@perxtech/core';
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from '@angular/router';
import {
  Observable,
  of,
  throwError
} from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-progress-campaign',
  templateUrl: './progress-campaign.component.html',
  styleUrls: ['./progress-campaign.component.scss']
})
export class ProgressCampaignComponent implements OnInit {
  public appConfig: IConfig<void>;
  public appRemoteFlags: IFlags;
  public campaign: ICampaign;
  public rewards$: Observable<IReward[]> | null;

  constructor(
    private route: ActivatedRoute,
    protected router: Router,
    protected configService: ConfigService,
    protected campaignService: ICampaignService,
    protected settingsService: SettingsService,
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<void>().pipe(
      map((config: IConfig<void>) => this.appConfig = config),
      switchMap(() => this.settingsService.getRemoteFlagsSettings()),
      tap((flags: IFlags) => {
        this.appRemoteFlags = flags;
      }),
      switchMap(() => this.route.paramMap),
      filter((params: ParamMap) => params.has('id')),
      switchMap((params: ParamMap) => {
        const id: string | null = params.get('id');
        if (!id) {
          return throwError({ message: 'campaign id is required' });
        }
        const idN = Number.parseInt(id, 10);
        return this.campaignService.getCampaign(idN);
      })
    ).subscribe(
      (campaign: ICampaign) => {
        this.campaign = campaign;
        this.rewards$ = campaign.rewards ? of(campaign.rewards) : null;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }
}
