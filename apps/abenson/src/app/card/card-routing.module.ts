import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { CardComponent } from './containers/card/card.component';
import { ExistingCardComponent } from './containers/existing-card/existing-card.component';

const routes: Routes = [
  { path: '', component: CardComponent },
  { path: 'existing-card', component: ExistingCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
