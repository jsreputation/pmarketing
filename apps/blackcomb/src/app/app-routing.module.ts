import { PreAuthGuard } from './pre-auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { PreLoginGuard } from './pre-login.guard';
import { AppPreloadingStrategy } from './preload-strat';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard, PreAuthGuard],
    data: { preload: true, delay: false }
  },
  {
    path: 'signup',
    loadChildren: () => import('./sign-up/sign-up.module').then((mod) => mod.SignUpModule),
    canActivate: [PublicGuard, PreAuthGuard],
    data: { preload: false, delay: false }
  },
  { path: 'otp/:type',
    loadChildren: () => import('./otp/otp.module').then((mod) => mod.OtpModule),
    data: { preload: false, delay: false }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((mod) => mod.ForgotPasswordModule),
    canActivate: [PublicGuard, PreAuthGuard],
    data: { preload: false, delay: false }
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then((mod) => mod.LoadingModule),
    data: { preload: false, delay: false }
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((mod) => mod.LayoutModule),
    canActivate: [PreLoginGuard, ProtectedGuard],
    data: { preload: true, delay: false }
  },
  {
    path: 'c/:key',
    loadChildren: () => import('./content/content.module').then(mod => mod.ContentModule),
    data: { preload: false, delay: false }
    // content page can be accessed both logged-in and logged-out
    // canActivate: [ProtectedGuard]
  },
  { path: '**', redirectTo: '/home', canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: '/loading', canActivate: [PublicGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: AppPreloadingStrategy})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
