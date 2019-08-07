import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StampRoutingModule { }
