import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StampsComponent } from './stamps/stamps.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
    path: '', component: StampsComponent,
    children: [
      { path: '', component: CardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StampsRoutingModule { }
