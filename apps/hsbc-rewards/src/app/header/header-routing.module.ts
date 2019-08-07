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
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
