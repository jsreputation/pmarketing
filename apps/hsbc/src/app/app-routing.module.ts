import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { HomeComponent } from './home/home.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'puzzle', component: PuzzleComponent },
  { path: 'puzzle/:campaignId', component: PuzzleComponent },
  { path: 'puzzle/:campaignId/:cardId', component: PuzzleComponent },
  { path: 'voucher/:id', component: VoucherComponent },
  { path: 'redemption', component: RedemptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home/:popup', component: HomeComponent },
  { path: 'puzzles/:campaignId', component: PuzzlesComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
