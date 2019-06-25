import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { ProtectedGuard } from 'ngx-auth';
import { LoginComponent } from './login/login.component';
import { ShakeGameComponent } from './shake-game/shake-game.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'games', pathMatch: 'full' },
      { path: 'congrats', component: CongratsComponent },
      { path: 'games', component: GameComponent },
      { path: 'games/:id', component: GameComponent },
      { path: 'shake-game', component: ShakeGameComponent }
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
