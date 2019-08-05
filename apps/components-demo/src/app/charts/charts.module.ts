import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { PerxChartModule } from '@perx/chart';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { AdvancedPieComponent } from './advanced-pie/advanced-pie.component';
import { PieGridComponent } from './pie-grid/pie-grid.component';
import { TrendComponent } from './trend/trend.component';
import { MapComponent } from './map/map.component';
import { CalendarHeatmapComponent } from './calendar-heatmap/calendar-heatmap.component';
import { LineComponent } from './line/line.component';

@NgModule({
  declarations: [
    ChartsComponent,
    VerticalBarComponent,
    HorizontalBarComponent,
    PieComponent,
    AdvancedPieComponent,
    PieGridComponent,
    TrendComponent,
    MapComponent,
    CalendarHeatmapComponent,
    LineComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    PerxChartModule,
    MatTabsModule
  ]
})
export class ChartsModule { }
