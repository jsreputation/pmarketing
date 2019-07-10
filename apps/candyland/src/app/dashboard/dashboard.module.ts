import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { DashboardGameCardComponent } from './components/dashboard-game-card/dashboard-game-card.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { BusinessInsightComponent } from './components/business-insight/business-insight.component';
import { CreateEngagementPopupModule } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.module';


@NgModule({
  declarations: [DashboardPageComponent, DashboardGameCardComponent, BusinessInsightComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
    CreateEngagementPopupModule,
  ]
})
export class DashboardModule { }
