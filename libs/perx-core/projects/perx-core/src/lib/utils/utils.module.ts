import { NgModule } from '@angular/core';
import { NumericCharacterDirective } from './numeric-character.directive';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { NotificationService } from './notification/notification.service';
import { DebounceClickDirective } from './debounce-click.directive';
import { PinInputComponent } from './pin-input/pin-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NTimesPipe } from './pipes/n-times.pipe';

const directives = [
  NumericCharacterDirective,
  DebounceClickDirective,
];

const components = [
  PopupComponent,
  PinInputComponent,
];

@NgModule({
  declarations: [
    ...directives,
    ...components,
  ],
  entryComponents: [
    ...components,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  exports: [
    ...directives,
    ...components,
  ],
  providers: [
    NotificationService
  ]
})
export class UtilsModule {
}
