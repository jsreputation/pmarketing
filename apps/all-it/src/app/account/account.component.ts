import { Component, ChangeDetectionStrategy } from '@angular/core';
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
export class AccountComponent extends BCPAccountComponent {
  public profile$: Observable<IProfile> | null = null;
  public loyalty$: Observable<ILoyalty>;
  public pages!: AccountPageObject[];
  public preAuth: boolean = false;
  public theme: Observable<ITheme>;
  public appConfig$: Observable<IConfig<void>>;
  public memberFn: (membershipTierName: string) => Observable<string>;
  public remoteFlags: IFlags;
  public acquiredBadges: Observable<number>;

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
     private notificationService: NotificationService
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
      badgeService
    );
    this.preAuth = config.preAuth || false;
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
          forkJoin([ this.profile$, this.appConfig$ ]).pipe(
            switchMap(([ profile, appconfig ]) => this.postMembershipExtend(profile, appconfig))
          ).subscribe(
            (loyaltyTransaction: IV4LoyaltyTransaction) => {
              this.notificationService.addPopup({
                title: 'Success',
                text: `Thank you! Your membership has been extended using ${Math.abs(loyaltyTransaction.points)} points`
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

  private postMembershipExtend(profile: IProfile, appconfig: IConfig<void>): Observable<IV4LoyaltyTransaction> {
    return this.http.post(
      `${appconfig.apiHost}/v4/custom/allit/membership_accounts/${profile.id}/extend`, null).pipe(
      map((res: IV4AllItMembershipExtendResponse) => res.data)
    );
  }
}

interface IV4AllItMembershipExtendResponse {
  data: IV4LoyaltyTransaction;
}

interface IV4LoyaltyTransaction {
  id: number;
  transacted_at: Date;
  properties: ICustomProperties;
  points: number;
  loyalty_program_id: number;
}
