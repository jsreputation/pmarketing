import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StampCardComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StampRoutingModule { }
