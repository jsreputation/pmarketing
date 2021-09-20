import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

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
  BadgeService,
} from '@perxtech/core';
import { AccountComponent as BCPAccountComponent} from '@perxtech/blackcomb-pages';

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
}
