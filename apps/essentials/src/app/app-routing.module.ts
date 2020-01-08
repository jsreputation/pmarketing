import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@es-core/guards/auth.guard';
import { NoAuthGuard } from '@es-core/guards/no-auth.guard';
import { MainContainerComponent } from './main-container/main-container.component';
import { LoginComponent } from './auth/containers/login/login.component';
import { TestPageComponent } from './test-page/test-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/'},
  {
    path: '',
    component: MainContainerComponent,
    canActivate: [AuthGuard],
    children: [
      // Example:
      // {
      // {
      //   path: 'feature',
      //   loadChildren: () => import('./feature/feature.module').then(mod => mod.FeatureModule)
      // },
      {
        path: '',
        component: TestPageComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'password',
    canActivate: [NoAuthGuard],
    loadChildren: () => import('./password/password.module').then(mod => mod.PasswordModule)
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
