import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralComponent, ReferralModule as BCPReferralModule, } from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: ReferralComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), BCPReferralModule],
})
export class ReferralModule {}
