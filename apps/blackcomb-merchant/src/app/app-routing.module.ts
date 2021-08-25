import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule,
} from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('./home/home.module').then((mod) => mod.HomeModule) },
      { path: 'transaction-history',
      loadChildren: () => import('./transaction-history/transaction-history.module').then((mod) => mod.TransactionHistoryModule) },
    ],
    canActivate: [ProtectedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
