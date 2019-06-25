import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { ShakeGameComponent } from './shake-game/shake-game.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: 'shake-game', component: ShakeGameComponent },
  { path: 'congrats', component: CongratsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
