import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '', component: ReportsComponent, children: [
      { path: '', redirectTo: 'downloads' },
      { path: 'downloads', loadChildren: () => import('./containers/downloads/downloads.module').then(m => m.DownloadsModule) },
      { path: 'scheduled', loadChildren: () => import('./containers/scheduled/scheduled.module').then(m => m.ScheduledModule) }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
