import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./main/main.module').then(mod => mod.MainModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
