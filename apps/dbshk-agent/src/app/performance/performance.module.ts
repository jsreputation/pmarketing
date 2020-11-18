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
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
    InfiniteScrollModule,
  ]
})
export class PerformanceModule { }
