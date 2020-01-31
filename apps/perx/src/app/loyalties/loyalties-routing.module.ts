import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyaltiesComponent } from './loyalties.component';

const routes: Routes = [
  { path: '', component: LoyaltiesComponent, children: [
    {path: '', redirectTo:'list'},
   { path: 'edit', loadChildren: () => import('./containers/edit/edit.module').then(m => m.EditModule) }, 
   { path: 'list', loadChildren: () => import('./containers/list/list.module').then(m => m.ListModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltiesRoutingModule { }
