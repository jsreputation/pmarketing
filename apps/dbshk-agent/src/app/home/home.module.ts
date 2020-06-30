import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, HomeModule as BCPHomeModule } from '@perxtech/blackcomb-pages';
import { RewardPopupComponent } from '@perxtech/core';
const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  imports: [
    BCPHomeModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [
    RewardPopupComponent
  ]
})
export class HomeModule { }
