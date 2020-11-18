import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { ActivityComponent } from './activity/activity.component';

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
  ]
})
export class PerformanceModule { }
