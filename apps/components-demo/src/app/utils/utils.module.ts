import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinInputComponent } from './pin-input/pin-input.component';
import { UtilsComponent } from './utils.component';
import { UtilsModule as PerxCoreUtilsModule } from '@perx/core';
import { RouterModule } from '@angular/router';
import { UtilsRoutingModule } from './utils-routing.module';
import { PopupComponent } from './popup/popup.component';
import { MatTabsModule, MatButtonModule, MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [PinInputComponent, UtilsComponent, PopupComponent],
  imports: [
    RouterModule,
    CommonModule,
    PerxCoreUtilsModule,
    UtilsRoutingModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ]
})
export class UtilsModule { }
