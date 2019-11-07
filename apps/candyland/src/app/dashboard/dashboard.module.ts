import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { DashboardCampaignPageComponent } from 'src/app/dashboard/containers/dashboard-campaign-page/dashboard-campaign-page.component';
import { DashboardOverviewPageComponent } from 'src/app/dashboard/containers/dashboard-overview-page/dashboard-overview-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { DashboardGameCardComponent } from './components/dashboard-game-card/dashboard-game-card.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { BusinessInsightComponent } from './components/business-insight/business-insight.component';
import { CreateEngagementPopupModule } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.module';
import { MatRadioModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { TabItemViewComponent } from './components/tab-item-view/tab-item-view.component';
import { RangeDatePickerFilterModule } from '@cl-shared/components/range-date-picker-filter/range-date-picker-filter.module';
import { VerticalBarChartModule } from '@cl-shared/charts/vertical-bar-chart/vertical-bar-chart.module';
import { CirclePieChartModule } from '@cl-shared/charts/circle-pie-chart/circle-pie-chart.module';
import { CalendarChartModule } from '@cl-shared/charts/calendar-chart/calendar-chart.module';
import { PieChartModule } from '@cl-shared/charts/pie-chart/pie-chart.module';

import { MapChartModule } from '@cl-shared/charts/map-chart/map-chart.module';
import { TopFiveChartModule } from '@cl-shared/charts/top-five-chart/top-five-chart.module';
import { HorizontalBarChartModule } from '@cl-shared/charts/horizontal-bar-chart/horizontal-bar-chart.module';
import { RadiusCircleChartModule } from '@cl-shared/charts/radius-circle-chart/radius-circle-chart.module';
import { LinearChartModule, ChartCardModule } from '@cl-shared';
import { DashboardRewardsPageComponent } from './containers/dashboard-rewards-page/dashboard-rewards-page.component';
import { DashboardChartsParametersService } from './services/dashboard-charts-parameters.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { translateLoader } from '@cl-core/translate-services/multiple-translate-loader-service';

@NgModule({
  declarations: [
    DashboardPageComponent,
    DashboardOverviewPageComponent,
    DashboardGameCardComponent,
    BusinessInsightComponent,
    TabItemViewComponent,
    DashboardRewardsPageComponent,
    DashboardCampaignPageComponent
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
    MatTabsModule,
    MatSelectModule,
    ChartCardModule,
    SearchFilterModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient) => translateLoader(httpClient, [
          { prefix: './assets/i18n/dashboard/', suffix: '.json' },
          { prefix: '/assets/i18n/common/', suffix: '.json'}
        ]),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  providers: [
    DashboardChartsParametersService
  ]
})
export class DashboardModule {
}
