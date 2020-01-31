import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignsComponent } from './campaigns.component';

const routes: Routes = [
  { path: '', component: CampaignsComponent, children: [
    {path:'', redirectTo:'list'},
  { path: 'list', loadChildren: () => import('./containers/list/list.module').then(m => m.ListModule) },
  { path: 'edit', loadChildren: () => import('./containers/edit/edit.module').then(m => m.EditModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
