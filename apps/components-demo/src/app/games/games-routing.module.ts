import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { ScratchComponent } from './scratch/scratch.component';

const routes: Routes = [
  {
    path: '', component: GamesComponent,
    children: [
      { path: '', redirectTo: 'shake', pathMatch: 'full' },
      { path: 'shake', component: ShakeComponent },
      { path: 'tap', component: TapComponent },
      { path: 'scratch', component: ScratchComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
