import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule, MatTabsModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { UtilsModule as PerxCoreUtilsModule } from '@perxtech/core';

import { PinInputComponent } from './pin-input/pin-input.component';
import { PopupComponent } from './popup/popup.component';
import { UtilsRoutingModule } from './utils-routing.module';
import { UtilsComponent } from './utils.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [PinInputComponent, UtilsComponent, PopupComponent, TimerComponent],
  imports: [
    RouterModule,
    CommonModule,
    PerxCoreUtilsModule,
    UtilsRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class UtilsModule { }
