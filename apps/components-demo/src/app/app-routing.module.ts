import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProtectedGuard } from 'ngx-auth';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: '', pathMatch: 'full',
    canActivate: [ProtectedGuard]
  },
  {
    path: 'rewards', loadChildren: () => import('./rewards/rewards.module').then(mod => mod.RewardsModule),
    canActivate: [ProtectedGuard]

  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
