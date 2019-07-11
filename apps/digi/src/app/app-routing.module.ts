import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { ResultComponent } from './result/result.component';
import { ProtectedGuard } from 'ngx-auth';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/games', pathMatch: 'full' },
      { path: 'result', component: ResultComponent },
      { path: 'games', component: GameComponent },
      { path: 'games/:gameId', component: GameComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
