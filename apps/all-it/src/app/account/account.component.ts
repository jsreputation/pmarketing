import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { forkJoin, Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import {
  ProfileService,
  IProfile,
  ConfigService,
  IConfig,
  AuthenticationService,
  Config,
  AccountPageObject,
  ITheme,
  ThemesService,
  LoyaltyService,
  ILoyalty,
  SettingsService,
  IFlags,
  BadgeService, ICustomProperties, NotificationService,
  FlagLocalStorageService
} from '@perxtech/core';
import { AccountComponent as BCPAccountComponent} from '@perxtech/blackcomb-pages';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'allit-account',
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent extends BCPAccountComponent implements OnInit {
  public profile$: Observable<IProfile> | null = null;
  public loyalty$: Observable<ILoyalty>;
  public pages!: AccountPageObject[];
  public preAuth: boolean = false;
  public theme: Observable<ITheme>;
  public appConfig$: Observable<IConfig<void>>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public remoteFlags: IFlags;
  public acquiredBadges: Observable<number>;
  public isPremiumMember: boolean = false;

  constructor(
     config: Config,
     profileService: ProfileService,
     loyaltyService: LoyaltyService,
     configService: ConfigService,
     translate: TranslateService,
     router: Router,
     authenticationService: AuthenticationService,
     themesService: ThemesService,
     settingsService: SettingsService,
     badgeService: BadgeService,
     private http: HttpClient,
     private notificationService: NotificationService,
     protected flagLocalStorageService: FlagLocalStorageService
  ) {
    super(
      config,
      profileService,
      loyaltyService,
      configService,
      translate,
      router,
      authenticationService,
      themesService,
      settingsService,
      badgeService,
      flagLocalStorageService
    );
    this.preAuth = config.preAuth || false;
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.loyalty$.subscribe((loyalty: ILoyalty) => {
      if (loyalty && loyalty.tiers) {
        this.isPremiumMember = loyalty.tiers.filter((tier) => tier.name === 'Premium').length > 0;
      }
    })
  }

  public confirmRenewalPopup() {
    this.notificationService.addPopup({
      title: 'Renew Memebership',
      text: 'Would you like to renew your membership using points?',
      buttonTxt: 'Renew',
      buttonTxt2: 'Cancel',
      hideCloseButton: true,
      afterClosedCallBack: {
        dialogClosed: (): void => {
          forkJoin([ this.loyalty$, this.appConfig$ ]).pipe(
            switchMap(([ loyalty, appconfig ]) => this.postMembershipExtend(loyalty, appconfig))
          ).subscribe(
            (loyaltyTransaction: IV4LoyaltyTransaction) => {
              this.notificationService.addPopup({
                title: 'Success',
                text: `Thank you! Your membership has been extended using ${Math.abs(loyaltyTransaction.deducted_points.points)} points`
              });
            },
            () => {
              this.notificationService.addPopup({
                title: 'Failed',
                text: `Sorry, could not process your request.`
              });
            }
          );
        }
      }
    });
  }

  private postMembershipExtend(loyalty: ILoyalty, appconfig: IConfig<void>): Observable<IV4LoyaltyTransaction> {
    return this.http.post(
      `${appconfig.apiHost}/v4/custom/allit/loyalty/${loyalty.id}/extend_membership`, null).pipe(
      map((res: IV4AllItMembershipExtendResponse) => res.data)
    );
  }
}

interface IV4AllItMembershipExtendResponse {
  data: IV4LoyaltyTransaction;
}

interface IV4PointsTransaction {
  id: number;
  transacted_at: Date;
  properties: ICustomProperties;
  points: number;
  loyalty_program_id: number;
}

interface IV4LoyaltyTransaction {
  deducted_points: IV4PointsTransaction;
  membership_end_date: Date;
}
