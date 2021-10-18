import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { FilterResultComponent } from './filter-result/filter-result.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';
import { NearbyDealsComponent } from './nearby-deals/nearby-deals.component';
import { TreatWelcomeComponent } from './treat-welcome/treat-welcome.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { TreatEnrollPageComponent } from './treat-enroll-page/treat-enroll-page.component';
import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page/treat-enroll-complete-page.component';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'result', component: FilterResultComponent },
      { path: 'deal-welcome/:rid', component: DealLandingComponent },
      { path: 'treat-welcome/:id', component: TreatWelcomeComponent },
      { path: 'treat-enroll/:id',component:TreatEnrollPageComponent },
      { path: 'nearby-deals', component: NearbyDealsComponent },
      { path: 'catalog-page/:id', component: CatalogPageComponent},
      {path: 'treat-enroll/:id/complete',component:TreatEnrollCompletePageComponent},
      { path: 'filter', component: FilterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
