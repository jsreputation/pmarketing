import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { HomeComponent } from './home/home.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { ProtectedGuard } from 'ngx-auth';
import { TncComponent } from './tnc/tnc.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'puzzle', component: PuzzleComponent },
      { path: 'puzzle/:campaignId', component: PuzzleComponent },
      { path: 'puzzle/:campaignId/:cardId', component: PuzzleComponent },
      { path: 'puzzles/:campaignId', component: PuzzlesComponent },
      { path: 'redemption/:id', component: RedemptionComponent },
      { path: 'voucher/:id', component: VoucherComponent }
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'tnc', component: TncComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
