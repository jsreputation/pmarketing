import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [{
      path: 'home',
      loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule),
      canActivate: [ProtectedGuard]
    }, {
      path: 'wallet',
      loadChildren: () => import('../wallet/wallet.module').then(mod => mod.WalletModule)
    }, {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'home'
    }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
