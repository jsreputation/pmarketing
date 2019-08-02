import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { VerticalBarComponent } from './vertical-bar/vertical-bar.component';
import { PerxChartModule} from '@perx/chart';
import { HorizontalBarComponent } from './horizontal-bar/horizontal-bar.component';
import { PieComponent } from './pie/pie.component';

@NgModule({
  declarations: [ChartsComponent, VerticalBarComponent, HorizontalBarComponent, PieComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    PerxChartModule
  ]
})
export class ChartsModule { }
