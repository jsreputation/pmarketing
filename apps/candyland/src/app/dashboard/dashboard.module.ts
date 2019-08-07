import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { DashboardGameCardComponent } from './components/dashboard-game-card/dashboard-game-card.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { BusinessInsightComponent } from './components/business-insight/business-insight.component';
import { CreateEngagementPopupModule } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.module';
import { MatRadioModule } from '@angular/material';
import { TabItemViewComponent } from './components/tab-item-view/tab-item-view.component';
import { RangeDatePickerFilterModule } from '@cl-shared/components/range-date-picker-filter/range-date-picker-filter.module';
import { VerticalBarChartModule } from '@cl-shared/charts/vertical-bar-chart/vertical-bar-chart.module';
import { CirclePieChartModule } from '@cl-shared/charts/circle-pie-chart/circle-pie-chart.module';
import { CalendarChartModule } from '@cl-shared/charts/calendar-chart/calendar-chart.module';
import { PieChartModule } from '@cl-shared/charts/pie-chart/pie-chart.module';
import { LinearChartModule } from '@cl-shared/charts/linear-chart/linear-chart.module';
import { MapChartModule } from '@cl-shared/charts/map-chart/map-chart.module';
import { TopFiveChartModule } from '@cl-shared/charts/top-five-chart/top-five-chart.module';
import { HorizontalBarChartModule } from '@cl-shared/charts/horizontal-bar-chart/horizontal-bar-chart.module';
import { RadiusCircleChartModule } from '@cl-shared/charts/radius-circle-chart/radius-circle-chart.module';

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardGameCardComponent,
    BusinessInsightComponent,
    TabItemViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    CreateEngagementPopupModule,
    RangeDatePickerFilterModule,
    VerticalBarChartModule,
    CirclePieChartModule,
    CalendarChartModule,
    PieChartModule,
    LinearChartModule,
    MapChartModule,
    TopFiveChartModule,
    HorizontalBarChartModule,
    RadiusCircleChartModule,

    MatRadioModule,
  ]
})
export class DashboardModule { }
