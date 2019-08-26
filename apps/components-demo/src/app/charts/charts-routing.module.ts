import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';
import { TrendComponent } from './trend/trend.component';
import { MapComponent } from './map/map.component';
import { CalendarHeatmapComponent } from './calendar-heatmap/calendar-heatmap.component';
import { LineComponent } from './line/line.component';
import { MetabaseComponent } from './metabase/metabase.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '', component: ChartsComponent,
    children: [
      { path: '', redirectTo: 'vertical-bar', pathMatch: 'full' },
      { path: 'vertical-bar', component: VerticalBarComponent },
      { path: 'horizontal-bar', component: HorizontalBarComponent },
      { path: 'pie', component: PieComponent },
      { path: 'trend', component: TrendComponent },
      { path: 'table', component: TableComponent },
      { path: 'map', component: MapComponent },
      { path: 'heatmap', component: CalendarHeatmapComponent },
      { path: 'line', component: LineComponent },
      { path: 'metabase', component: MetabaseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
