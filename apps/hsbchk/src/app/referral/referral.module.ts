import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, ReferralComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', component: ReferralComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule
  ]
})
export class ReferralModule { }
