import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';
import { AdvancedPieComponent } from './advanced-pie/advanced-pie.component';
import { PieGridComponent } from './pie-grid/pie-grid.component';
import { TrendComponent } from './trend/trend.component';
import { MapComponent } from './map/map.component';
import { CalendarHeatmapComponent } from './calendar-heatmap/calendar-heatmap.component';
import { LineComponent } from './line/line.component';

const routes: Routes = [
  {
    path: '', component: ChartsComponent,
    children: [
      { path: '', redirectTo: 'vertical-bar', pathMatch: 'full' },
      { path: 'vertical-bar', component: VerticalBarComponent },
      { path: 'horizontal-bar', component: HorizontalBarComponent },
      { path: 'pie', component: PieComponent },
      { path: 'advanced-pie', component: AdvancedPieComponent },
      { path: 'grid-pie', component: PieGridComponent },
      { path: 'trend', component: TrendComponent },
      { path: 'map', component: MapComponent },
      { path: 'heatmap', component: CalendarHeatmapComponent },
      { path: 'line', component: LineComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
