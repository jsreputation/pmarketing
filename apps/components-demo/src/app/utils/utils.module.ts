import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
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
