import {
  Component,
  OnInit
} from '@angular/core';
import {
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  IFlags,
  SettingsService
} from '@perxtech/core';
import {
  catchError,
  map,
  switchMap,
  takeLast,
  tap
} from 'rxjs/operators';
import {
  Observable,
  of
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-campaign-card-home',
  templateUrl: './progress-campaign-home.component.html',
  styleUrls: [ './progress-campaign-home.component.scss' ]
})
export class ProgressCampaignHomeComponent implements OnInit {
  public appConfig: IConfig<void>;
  public stampCampaigns$: Observable<ICampaign[]>;
  public appRemoteFlags: IFlags;
  public showPageTitle: boolean = false;

  constructor(
    protected router: Router,
    protected configService: ConfigService,
    protected campaignService: ICampaignService,
    protected settingsService: SettingsService,
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig<void>().pipe(
      map((config: IConfig<void>) => {
        this.appConfig = config;
        this.initCampaign();
      }),
      switchMap(() => this.settingsService.getRemoteFlagsSettings())
    ).subscribe(
      (flags: IFlags) => {
        // todo: create a function to wrap all the rest of the init calls
        this.appRemoteFlags = flags;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  private initCampaign(): void {
    this.stampCampaigns$ = this.campaignService.getCampaigns({ type: CampaignType.stamp })
      .pipe(
        tap((campaigns: ICampaign[]) => this.showPageTitle = campaigns.length > 0),
        switchMap((campaigns: ICampaign[]) => of(campaigns).pipe(catchError(err => of(err)))),
        takeLast(1)
      );
  }

  public goToCampaignPage(campaign: ICampaign): void {
    // if (campaign.type === CampaignType.game) {
    //   // currently only the quiz have proper data for landing page, once other campaign
    //   // type have proper data, move this block out
    //   if (this.appConfig.showCampaignLandingPage) {
    //     this.router.navigate([`campaign-welcome/${campaign.id}`]);
    //     return;
    //   }
    //
    //   this.router.navigate([`quiz/${campaign.id}`]);
    //   return;
    // }
    // if (campaign.subType === 'survey') {
    //   this.router.navigate([`survey/${campaign.id}`]);
    //   return;
    // }

    // todo: unit test - expected to be progress campaigns only here

    this.router.navigate([`progress-campaign/${campaign.id}`]);
  }
}
