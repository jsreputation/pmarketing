import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';
import { OverviewComponent } from './overview/overview.component';
import { ActivityComponent } from './activity/activity.component';
import { LoyaltyModule, UtilsModule } from '@perxtech/core';
import { MatFormFieldModule, MatListModule, MatSelectModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [{
  path: '',
  component: PerformanceComponent
}];
@NgModule({
  declarations: [
    PerformanceComponent,
    OverviewComponent,
    ActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    MatTabsModule,
    LoyaltyModule,
    UtilsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    HttpClientModule
  ]
})
export class PerformanceModule { }
