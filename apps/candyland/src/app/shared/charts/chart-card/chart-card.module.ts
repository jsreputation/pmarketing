import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerxChartModule } from '@perxtech/chart';
import { ChartCardComponent } from './chart-card.component';
import { environment } from '@cl-environments/environment';

@NgModule({
  declarations: [
    ChartCardComponent
  ],
  exports: [
    ChartCardComponent
  ],
  imports: [
    CommonModule,
    PerxChartModule.forRoot({ tokenBasePath: environment.apiHost })
  ]
})
export class ChartCardModule { }
