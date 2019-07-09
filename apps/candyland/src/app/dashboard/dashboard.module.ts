import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './containers/dashboard-page/dashboard-page.component';
import { DashboardGameCardComponent } from './components/dashboard-game-card/dashboard-game-card.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { BusinessInsightComponent } from './components/business-insight/business-insight.component';


@NgModule({
  declarations: [DashboardPageComponent, DashboardGameCardComponent, BusinessInsightComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ButtonModule,
  ]
})
export class DashboardModule { }
