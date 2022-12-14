import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { ScratchComponent } from './scratch/scratch.component';
import { SpinComponent } from './spin/spin.component';
import {SnakeComponent} from './snake/snake.component';
import {SweepComponent} from './sweep/sweep.component';

const routes: Routes = [
  {
    path: '', component: GamesComponent,
    children: [
      { path: '', redirectTo: 'shake', pathMatch: 'full' },
      { path: 'shake', component: ShakeComponent },
      { path: 'tap', component: TapComponent },
      { path: 'scratch', component: ScratchComponent },
      { path: 'spin', component: SpinComponent },
      { path: 'snake', component: SnakeComponent },
      { path: 'sweep', component: SweepComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
