import { NgModule } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpBackend
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification/notification.service';
import { NumericCharacterDirective } from './directives/numeric-character.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { RepeatTimesDirective } from './directives/repeat-times.directive';
import { PinInputComponent } from './pin-input/pin-input.component';
import { FeedReaderService } from './feed-reader.service';
import { GeneralStaticDataService } from './general-static-data/general-static-data.service';
import { ThemesService } from './themes/themes.service';
import { WhistlerThemesService } from './themes/whistler-themes.service';
import { Config } from '../config/config';
import { V4ThemesService } from './themes/v4-themes.service';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { StorageModule } from './storage/storage.module';
import { FeedItemPopupComponent } from './feed-item-popup/feed-item-popup.component';
import { ConfigService } from '../config/config.service';
import { TimerComponent } from './timer/timer.component';
import { CountDownComponent } from './count-down/count-down.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { LocationFilterPopupComponent } from './location-filter-popup/location-filter-popup.component';
import { TokenStorage } from './storage/token-storage.service';
import { MatRippleModule } from '@angular/material/core';
import { StatisticCardComponent } from './statistic-card/statistic-card.component';
import { LeaderboardCTAComponent } from './leaderboard-cta/leaderboard-cta.component';
import { BadgeDetailPopupComponent } from './badge-detail-popup/badge-detail-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { PipeUtilsModule } from './pipe-utils.module';

export function themesServiceFactory(
  handler: HttpBackend,
  http: HttpClient,
  config: Config,
  configService: ConfigService,
  tokenStorage: TokenStorage
): ThemesService {
  if (config.isWhistler) {
    return new WhistlerThemesService(http, config);
  }
  return new V4ThemesService(handler, http, configService, tokenStorage);
}

const directives = [
  NumericCharacterDirective,
  DebounceClickDirective,
  RepeatTimesDirective,
];

const components = [
  PopupComponent,
  PinInputComponent,
  NewsfeedComponent,
  FeedItemPopupComponent,
  TimerComponent,
  CountDownComponent,
  LocationFilterPopupComponent,
  StatisticCardComponent,
  LeaderboardCTAComponent,
  BadgeDetailPopupComponent
];

// make sure we have only one instance of the NotificationService
export function notificationServiceFactory(): NotificationService {
  // @ts-ignore
  if (window.notificationService === undefined) {
    // @ts-ignore
    window.notificationService = new NotificationService();
  }
  // @ts-ignore
  return window.notificationService;
}

@NgModule({
  declarations: [
    ...directives,
    ...components
  ],
  entryComponents: [
    ...components,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatRippleModule,
    StorageModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    ScrollingModule,
    MatToolbarModule,
    MatIconModule,
    TranslateModule.forChild(),
    PipeUtilsModule
  ],
  exports: [
    ...directives,
    ...components
  ],
  providers: [
    { provide: NotificationService, useFactory: notificationServiceFactory },
    FeedReaderService,
    GeneralStaticDataService,
    {
      provide: ThemesService,
      useFactory: themesServiceFactory,
      deps: [HttpBackend, HttpClient, Config, ConfigService, TokenStorage]
    }
  ]
})
export class UtilsModule {
}
