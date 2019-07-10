import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamePlayComponent } from './game-play/game-play.component';
import { HomeComponent } from './home/home.component';
import { RedeemComponent } from './redeem/redeem.component';
import { RewardDetailComponent } from './reward-detail/reward-detail.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'game-play/:id', component: GamePlayComponent },
      { path: 'redeem/:mode/:id', component: RedeemComponent },
      { path: 'reward-detail/:id', component: RewardDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
