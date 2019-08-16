import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';

const routes: Routes = [{
  path: '',
  component: WalletComponent,
  children: [{
    path: 'my-reward/:id',
    loadChildren: () => import('./list/list.module').then(mod => mod.ListModule)
  }, {
    path: '',
    redirectTo: 'my-reward/list',
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
