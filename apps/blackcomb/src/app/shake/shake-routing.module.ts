import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShakeComponent } from './shake/shake.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ShakeComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShakeRoutingModule { }
