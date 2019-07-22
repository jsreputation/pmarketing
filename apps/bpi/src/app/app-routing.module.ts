import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { LoginComponent } from './login/login.component';
import { ProtectedGuard } from 'ngx-auth';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {
    path: 'bpi',
    children: [
      { path: 'game', component: GameComponent },
      { path: 'game/:campaignId', component: GameComponent },
      { path: 'congrats', component: CongratsComponent },
      { path: 'landing', component: LandingComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
