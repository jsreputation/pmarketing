import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';
import { NearbyDealsComponent } from './nearby-deals/nearby-deals.component';
import { TreatWelcomeComponent } from './treat-welcome/treat-welcome.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { TreatEnrollPageComponent } from './treat-enroll-page/treat-enroll-page.component';
import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page/treat-enroll-complete-page.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'result', component: ResultComponent },
      { path: 'deal-welcome/:rid', component: DealLandingComponent },
      { path: 'treat-welcome/:id', component: TreatWelcomeComponent },
      { path: 'treat-enroll/:id',component:TreatEnrollPageComponent },
      { path: 'nearby-deals', component: NearbyDealsComponent },
      { path: 'catalog-page', component: CatalogPageComponent},
      {path: 'treat-enroll/:id/complete',component:TreatEnrollCompletePageComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
