import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { HomeComponent } from './home/home.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'puzzle', component: PuzzleComponent, canActivate: [ProtectedGuard] },
  { path: 'puzzle/:campaignId', component: PuzzleComponent, canActivate: [ProtectedGuard] },
  { path: 'puzzle/:campaignId/:cardId', component: PuzzleComponent, canActivate: [ProtectedGuard] },
  { path: 'voucher/:id', component: VoucherComponent, canActivate: [ProtectedGuard] },
  { path: 'redemption', component: RedemptionComponent, canActivate: [ProtectedGuard] },
  { path: 'home', component: HomeComponent, canActivate: [ProtectedGuard] },
  { path: 'home/:popup', component: HomeComponent, canActivate: [ProtectedGuard] },
  { path: 'puzzles/:campaignId', component: PuzzlesComponent, canActivate: [ProtectedGuard] },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
