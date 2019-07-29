import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectedGuard } from 'ngx-auth';
import { HomeComponent } from './home/home.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { QrscannerComponent } from './qrscanner/qrscanner.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'qrscanner/:path', component: QrscannerComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'reset', component: ResetPasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
