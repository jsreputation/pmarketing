import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { ReferralComponent } from './referral.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [{ path: '', component: ReferralComponent }];

@NgModule({
  declarations: [ReferralComponent],
  imports: [RouterModule.forChild(routes),
  TranslateModule.forChild(),
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ]
})
export class ReferralModule { }
