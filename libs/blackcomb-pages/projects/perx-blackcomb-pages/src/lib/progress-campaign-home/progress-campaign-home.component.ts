import { Component, OnInit } from '@angular/core';
import {
  CampaignType,
  ConfigService,
  ICampaign,
  ICampaignService,
  IConfig,
  IFlags,
  IMicrositeSettings,
  SettingsService
} from '@perxtech/core';
import { catchError, map, switchMap, takeLast, tap } from 'rxjs/operators';
import { Observable, of, zip } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-campaign-card-home',
  templateUrl: './progress-campaign-home.component.html',
  styleUrls: [ './progress-campaign-home.component.scss' ]
})
export class ProgressCampaignHomeComponent implements OnInit {
  public appConfig: IConfig<void>;
  public campaigns$: Observable<ICampaign[]>;
  public appRemoteFlags: IFlags;
  public showPageTitle: boolean = false;
  public bannerImg: string;

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
      switchMap(() => this.settingsService.getTenantAppSettings('microsite_custom_content')),
      tap((settings: IMicrositeSettings) => {
        this.bannerImg = <string> settings.jsonValue.campaign_banner;
        this.showPageTitle = !this.bannerImg;
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
    // get targeted campaigns to prevent zip within raz-adapted-collection from returning undefined
    const stampCampaigns: Observable<ICampaign[]> = this.campaignService.getCampaigns({ type: CampaignType.stamp }).pipe(
      switchMap((campaigns: ICampaign[]) => of(campaigns).pipe(catchError(err => of(err)))),
      takeLast(1)
    );
    const loyaltyCampaigns: Observable<ICampaign[]> = this.campaignService.getCampaigns({ type: CampaignType.give_reward }).pipe(
      switchMap((campaigns: ICampaign[]) => of(campaigns).pipe(catchError(err => of(err)))),
      takeLast(1)
    );
    const referralCampaigns: Observable<ICampaign[]> = this.campaignService.getCampaigns({ type: CampaignType.invite }).pipe(
      switchMap((campaigns: ICampaign[]) => of(campaigns).pipe(catchError(err => of(err)))),
      takeLast(1)
    );
    // ordered by fetching stamp campaigns firstly
    this.campaigns$ = zip(
      stampCampaigns,
      loyaltyCampaigns,
      referralCampaigns
    ).pipe(
      map(([stamp, loyalty, referral]) => [...stamp, ...loyalty, ...referral])
    );
  }

  public goToCampaignPage(campaign: ICampaign): void {
    // todo: unit test - expected to be progress campaigns only here
    this.router.navigate([`progress-campaign/${campaign.id}`]);
  }

//  START CUSTOM RAZER THROWAWAY CODE
//  END CUSTOM RAZER THROWAWAY CODE
}
