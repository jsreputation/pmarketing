import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinInputComponent } from './pin-input/pin-input.component';
import { UtilsComponent } from './utils.component';
import { UtilsModule as PerxCoreUtilsModule } from '@perx/core';
import { RouterModule } from '@angular/router';
import { UtilsRoutingModule } from './utils-routing.module';

@NgModule({
  declarations: [PinInputComponent, UtilsComponent],
  imports: [
    RouterModule,
    CommonModule,
    PerxCoreUtilsModule,
    UtilsRoutingModule
  ]
})
export class UtilsModule { }
