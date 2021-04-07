import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeMobileRoutingModule } from './change-mobile-routing.module';
import { ChangeMobileComponent } from './change-mobile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
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
