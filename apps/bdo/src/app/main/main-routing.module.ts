import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';
import { TreatWelcomeComponent } from './treat-welcome/treat-welcome.component';
import { TreatEnrollPageComponent } from './treat-enroll-page/treat-enroll-page.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'search/:text', component: SearchComponent},
      { path: 'deal-welcome/:rid', component: DealLandingComponent},
      { path: 'treat-welcome/:id', component: TreatWelcomeComponent},
      {path: 'treat-enroll/:id',component:TreatEnrollPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
