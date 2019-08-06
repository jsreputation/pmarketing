import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [{
      path: '', redirectTo: '/login', pathMatch: 'full'
    }, {
      path: 'home',
      loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule),
      canActivate: [ProtectedGuard]
    }, {
      path: 'detail/:id',
      loadChildren: () => import('../reward-detail/reward-detail.module').then(mod => mod.RewardDetailModule)
    }, {
      path: '**',
      pathMatch: 'full',
      redirectTo: 'home'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
