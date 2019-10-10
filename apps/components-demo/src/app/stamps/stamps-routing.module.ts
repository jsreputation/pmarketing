import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StampsComponent } from './stamps/stamps.component';
import { CardComponent } from './card/card.component';
import { StampsListComponent } from './stamps-list/stamps-list.component';

const routes: Routes = [
  {
    path: '', component: StampsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'card' },
      { path: 'list', component: StampsListComponent },
      { path: 'card', component: CardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StampsRoutingModule { }
