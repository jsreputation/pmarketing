import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { PerxChartModule } from '@perxtech/chart';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';
import {
  MatTabsModule
} from '@angular/material';
import { TrendComponent } from './trend/trend.component';
import { MapComponent } from './map/map.component';
import { CalendarHeatmapComponent } from './calendar-heatmap/calendar-heatmap.component';
import { LineComponent } from './line/line.component';
import { MetabaseComponent } from './metabase/metabase.component';
import { TableComponent } from './table/table.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    ChartsComponent,
    VerticalBarComponent,
    HorizontalBarComponent,
    PieComponent,
    TrendComponent,
    MapComponent,
    CalendarHeatmapComponent,
    LineComponent,
    MetabaseComponent,
    TableComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    PerxChartModule.forRoot({ tokenBasePath: environment.apiHost }),
    MatTabsModule
  ]
})
export class ChartsModule { }
