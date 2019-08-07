import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TapComponent } from './tap/tap.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TapComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TapRoutingModule { }
