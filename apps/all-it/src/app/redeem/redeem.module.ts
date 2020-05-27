import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedeemComponent, RedeemModule as BCPRedeemModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: RedeemComponent
}];

@NgModule({
  imports: [
    BCPRedeemModule,
    RouterModule.forChild(routes),
  ]
})
export class RedeemModule { }
