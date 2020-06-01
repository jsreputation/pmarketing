import { NgModule } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule, MatCardModule, MatToolbarModule, MatCheckboxModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification/notification.service';
import { NumericCharacterDirective } from './directives/numeric-character.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { RepeatTimesDirective } from './directives/repeat-times.directive';
import { PinInputComponent } from './pin-input/pin-input.component';
import { FeedReaderService } from './feed-reader.service';
import { DistancePipe } from './directives/distance-pipe';
import { GeneralStaticDataService } from './general-static-data/general-static-data.service';
import { ThemesService } from './themes/themes.service';
import { WhistlerThemesService } from './themes/whistler-themes.service';
import { Config } from '../config/config';
import { V4ThemesService } from './themes/v4-themes.service';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { StorageModule } from './storage/storage.module';
import { FeedItemPopupComponent } from './feed-item-popup/feed-item-popup.component';
import { MatIconModule } from '@angular/material/icon';
import { SortRewardsPipe } from './directives/sort-rewards-pipe';
import { StripHtmlPipe } from './directives/striphtml-pipe';
import { ConfigService } from '../config/config.service';
import { TimerComponent, ForceLengthPipe } from './timer/timer.component';
import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';
import { V4MicrositeSettingInterceptor } from './themes/v4publicSettings.interceptor';
import { LocationFilterPopupComponent } from './location-filter-popup/location-filter-popup.component';

export function themesServiceFactory(http: HttpClient, config: Config, configService: ConfigService): ThemesService {
  if (config.isWhistler) {
    return new WhistlerThemesService(http, config);
  }
  return new V4ThemesService(http, configService);
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
  LocationFilterPopupComponent
];

const pipes = [
  DistancePipe,
  SortRewardsPipe,
  StripHtmlPipe,
  SafeHtmlPipe,
  SafeUrlPipe
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
    ...components,
    ...pipes,
    ForceLengthPipe,
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
    StorageModule,
    MatIconModule,
    MatToolbarModule,
    MatCheckboxModule,
    ScrollingModule,
    TranslateModule.forChild()
  ],
  exports: [
    ...directives,
    ...components,
    ...pipes
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: V4MicrositeSettingInterceptor, multi: true },
    { provide: NotificationService, useFactory: notificationServiceFactory },
    FeedReaderService,
    GeneralStaticDataService,
    {
      provide: ThemesService,
      useFactory: themesServiceFactory,
      deps: [HttpClient, Config, ConfigService]
    }
  ]
})
export class UtilsModule {
}
