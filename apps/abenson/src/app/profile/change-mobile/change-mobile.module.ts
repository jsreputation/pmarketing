import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeMobileRoutingModule } from './change-mobile-routing.module';
import { ChangeMobileComponent } from './change-mobile.component';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChangeMobileComponent],
  imports: [
    CommonModule,
    ChangeMobileRoutingModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ChangeMobileModule { }
