import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from 'ngx-auth';
import { PreAuthGuard } from './pre-auth.guard';
import { PreLoginGuard } from './pre-login.guard';
import { ProtectedGuard } from '@perxtech/core';

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
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then((mod) => mod.ForgotPasswordModule),
    canActivate: [PublicGuard, PreAuthGuard]
  },
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
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then((mod) => mod.WelcomeModule),
    canActivate: [PublicGuard, PreAuthGuard]
  },
  { path: '**', redirectTo: '/home', canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: '/loading', canActivate: [PublicGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
