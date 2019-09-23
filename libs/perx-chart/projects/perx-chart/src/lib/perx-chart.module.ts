import { NgModule, ModuleWithProviders } from '@angular/core';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';
import { AdvancedPieComponent } from './advanced-pie/advanced-pie.component';
import { GridPieComponent } from './grid-pie/grid-pie.component';
import { TrendComponent } from './trend/trend.component';
import { MapComponent } from './map/map.component';
import { CalendarHeatmapComponent } from './calendar-heatmap/calendar-heatmap.component';
import { LineComponent } from './line/line.component';
import { TableComponent } from './table/table.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MetaCardComponent } from './meta-card/meta-card.component';
import { MatTableModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule } from '@angular/material';
import { DataService } from './data.service';
import { EnvConfig } from './env.config';

const comps: any[] = [
  VerticalBarComponent,
  HorizontalBarComponent,
  PieComponent,
  AdvancedPieComponent,
  GridPieComponent,
  TrendComponent,
  MapComponent,
  CalendarHeatmapComponent,
  LineComponent,
  MetaCardComponent,
  TableComponent
];

@NgModule({
  imports: [
    NgxChartsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ...comps
  ],
  declarations: [
    ...comps,
  ],
  providers: [
    DataService
  ]
})
export class PerxChartModule {
  public static forRoot(config?: EnvConfig): ModuleWithProviders {
    return {
      ngModule: PerxChartModule,
      providers: [
        DataService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
