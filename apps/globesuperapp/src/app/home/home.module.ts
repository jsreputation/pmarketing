import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { RewardPopupComponent } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
