import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';

const routes: Routes = [
  {
    path: '', component: ChartsComponent,
    children: [
      { path: 'vertical-bar', component: VerticalBarComponent },
      { path: 'horizontal-bar', component: HorizontalBarComponent },
      { path: 'pie', component: PieComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
