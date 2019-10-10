import { NgModule } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
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
const directives = [
  NumericCharacterDirective,
  DebounceClickDirective,
  RepeatTimesDirective,
];

const components = [
  PopupComponent,
  PinInputComponent,
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
    ThemesService
  ]
})
export class UtilsModule {
}
