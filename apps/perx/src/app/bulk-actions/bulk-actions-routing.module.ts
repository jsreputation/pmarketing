import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BulkActionsComponent } from './bulk-actions.component';

const routes: Routes = [{ path: '', component: BulkActionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkActionsRoutingModule { }
