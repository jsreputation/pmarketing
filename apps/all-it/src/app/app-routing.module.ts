import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
import { PreLoginGuard } from './pre-login.guard';
import { PreAuthGuard } from './pre-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then((mod) => mod.LoginModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then((mod) => mod.SignupModule),
    canActivate: [PublicGuard]
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then((mod) => mod.LoadingModule)
  },
  {
    path: 'otp/:type',
    loadChildren: (): any => import('./otp/otp.module')
      .then((mod: any) => mod.OtpModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((mod) => mod.ForgotPasswordModule),
    canActivate: [PublicGuard, PreAuthGuard]
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
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
