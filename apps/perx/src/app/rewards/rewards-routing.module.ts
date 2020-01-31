import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RewardsComponent } from './rewards.component';

const routes: Routes = [
  { path: '', component: RewardsComponent, children:[
    {path:'', redirectTo:'list'},
   { path: 'edit', loadChildren: () => import('./containers/edit/edit.module').then(m => m.EditModule) },
    { path: 'list', loadChildren: () => import('./containers/list/list.module').then(m => m.ListModule) }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardsRoutingModule { }
