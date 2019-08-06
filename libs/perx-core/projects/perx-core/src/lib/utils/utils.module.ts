import { NgModule } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from './notification/notification.service';
import { NumericCharacterDirective } from './directives/numeric-character.directive';
import { DebounceClickDirective } from './directives/debounce-click.directive';
import { PinInputComponent } from './pin-input/pin-input.component';

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
