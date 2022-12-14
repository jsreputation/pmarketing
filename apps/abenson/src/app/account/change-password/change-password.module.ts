import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    // for change password BCPcomponent
    MatProgressSpinnerModule,
    TranslateModule.forChild(),
    PerxBlackcombPagesModule
  ]
})
export class ChangePasswordModule { }
