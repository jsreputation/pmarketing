import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BulkActionsComponent } from './bulk-actions.component';

const routes: Routes = [{ path: '', component: BulkActionsComponent }, { path: 'list', loadChildren: () => import('./containers/list/list.module').then(m => m.ListModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkActionsRoutingModule { }
