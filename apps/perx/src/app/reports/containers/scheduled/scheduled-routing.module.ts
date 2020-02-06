import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduledComponent } from './scheduled.component';

const routes: Routes = [{ path: '', component: ScheduledComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledRoutingModule { }
