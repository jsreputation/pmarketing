import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { ReferralComponent } from './referral.component';
import { CommonModule } from '@angular/common';
import { CampaignInviteService } from './campaign-invite.service';

const routes: Routes = [{ path: '', component: ReferralComponent }];

@NgModule({
  declarations: [ReferralComponent],
  imports: [RouterModule.forChild(routes),
  TranslateModule.forChild(),
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ],
  providers: [CampaignInviteService]
})
export class ReferralModule { }
