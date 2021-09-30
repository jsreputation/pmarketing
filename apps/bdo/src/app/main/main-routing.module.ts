import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'search/:text', component: SearchComponent},
      { path: 'deal-welcome/:cid', component: DealLandingComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
