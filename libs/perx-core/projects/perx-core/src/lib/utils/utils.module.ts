import { NgModule } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule, MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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

export function themesServiceFactory(http: HttpClient, config: Config): ThemesService {
  if (config.isWhistler) {
    return new WhistlerThemesService(http, config);
  }
  return new V4ThemesService(http, config);
}

const directives = [
  NumericCharacterDirective,
  DebounceClickDirective,
  RepeatTimesDirective,
];

const components = [
  PopupComponent,
  PinInputComponent,
  NewsfeedComponent
];

@NgModule({
  declarations: [
    ...directives,
    ...components,
    DistancePipe
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
    StorageModule
  ],
  exports: [
    ...directives,
    ...components,
    DistancePipe
  ],
  providers: [
    NotificationService,
    FeedReaderService,
    GeneralStaticDataService,
    { provide: ThemesService,
      useFactory: themesServiceFactory,
      deps: [HttpClient, Config]
    }
  ]
})
export class UtilsModule {
}
