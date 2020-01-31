import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MerchantsComponent } from './merchants.component';

const routes: Routes = [
  { path: '', component: MerchantsComponent, children:[
    {path:'', redirectTo:'list'},
  { path: 'list', loadChildren: () => import('./containers/list/list.module').then(m => m.ListModule) }, 
  { path: 'edit', loadChildren: () => import('./containers/edit/edit.module').then(m => m.EditModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MerchantsRoutingModule { }
