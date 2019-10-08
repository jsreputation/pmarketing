import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import {
  ContactUsComponent,
  HistoryComponent,
  HomeComponent,
  RewardPageComponent,
  LoadingComponent,
  LoginComponent,
  RedeemComponent,
  RewardDetailPageComponent,
  StampCardComponent,
  SurveyPageComponent,
  TncComponent,
  VoucherDetailPageComponent
} from '@perx/core';
import { 
  AccountComponent,
  GameComponent
} from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'account' },
    { path: 'account', component: AccountComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'game', component: GameComponent},
    { path: 'history', component: HistoryComponent},
    { path: 'home', component: HomeComponent},
    { path: 'reward', component: RewardPageComponent},
    { path: 'loading', component: LoadingComponent},
    { path: 'login', component: LoginComponent},
    { path: 'redeem', component: RedeemComponent},
    { path: 'reward-detail', component: RewardDetailPageComponent},
    { path: 'stamp', component: StampCardComponent},
    { path: 'survey', component: SurveyPageComponent},
    { path: 'tnc', component: TncComponent},
    { path: 'voucher', component: VoucherDetailPageComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
