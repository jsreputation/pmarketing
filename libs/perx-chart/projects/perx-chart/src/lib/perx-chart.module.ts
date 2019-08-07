import { NgModule } from '@angular/core';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';
import { AdvancedPieComponent } from './advanced-pie/advanced-pie.component';
import { GridPieComponent } from './grid-pie/grid-pie.component';
import { TrendComponent } from './trend/trend.component';
import { MapComponent } from './map/map.component';
import { CalendarHeatmapComponent } from './calendar-heatmap/calendar-heatmap.component';
import { LineComponent } from './line/line.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const comps: any[] = [
    VerticalBarComponent,
    HorizontalBarComponent,
    PieComponent,
    AdvancedPieComponent,
    GridPieComponent,
    TrendComponent,
    MapComponent,
    CalendarHeatmapComponent,
    LineComponent
];

@NgModule({
    imports: [
        NgxChartsModule
    ],
    exports: [
        ...comps
    ],
    declarations: [
        ...comps
    ]
})
export class PerxChartModule { }
