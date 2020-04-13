import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard, PublicGuard } from 'ngx-auth';
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
    path: 'enter-pin/:type',
    loadChildren: (): any => import('./enter-pin/enter-pin.module')
      .then((mod: any) => mod.EnterPinModule)
  },
  {
    path: '',
    loadChildren: () => import('./layout/layout.module').then((mod) => mod.LayoutModule),
    canActivate: [ProtectedGuard]
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
