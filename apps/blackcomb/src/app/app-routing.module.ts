import { PreAuthGuard } from './pre-auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { PreLoginGuard } from './pre-login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard, PreAuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then((mod) => mod.SignUpModule),
    canActivate: [PublicGuard, PreAuthGuard]
  },
  { path: 'otp/:type', loadChildren: () => import('./otp/otp.module').then((mod) => mod.OtpModule) },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then((mod) => mod.LoadingModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((mod) => mod.LayoutModule),
    canActivate: [PreLoginGuard, ProtectedGuard]
  },
  {
    path: 'c/:key',
    loadChildren: () => import('./content/content.module').then(mod => mod.ContentModule),
    // content page can be accessed both logged-in and logged-out
    // canActivate: [ProtectedGuard]
  },
  { path: '**', redirectTo: '/home', canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: '/loading', canActivate: [PublicGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
