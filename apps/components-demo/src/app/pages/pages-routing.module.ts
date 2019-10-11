import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import {
  RewardDetailsComponent,
  RedeemComponent,
  LoadingComponent,
  LoginComponent,
  AccountComponent,
  GameComponent,
  HistoryComponent,
  HomeComponent,
  RewardComponent,
  ContentComponent,
  StampCardComponent,
  SurveyComponent,
  VoucherDetailComponent
} from '@perx/blackcomb-pages';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'account' },
    { path: 'account', component: AccountComponent },
    { path: 'content', component: ContentComponent },
    { path: 'game', component: GameComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'home', component: HomeComponent },
    { path: 'reward', component: RewardComponent },
    { path: 'loading', component: LoadingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'redeem', component: RedeemComponent },
    { path: 'reward-detail', component: RewardDetailsComponent },
    { path: 'stamp', component: StampCardComponent },
    { path: 'survey', component: SurveyComponent },
    { path: 'voucher', component: VoucherDetailComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
