import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { VoucherComponent } from './voucher/voucher.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { HomeComponent } from './home/home.component';
import { PuzzlesComponent } from './puzzles/puzzles.component';
import { ProtectedGuard } from 'ngx-auth';
import { WalletComponent } from './wallet/wallet.component';
import { AccountComponent } from './account/account.component';
import { ContentComponent } from './content/content.component';

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
      { path: 'voucher/:id', component: VoucherComponent },
      { path: 'wallet', component: WalletComponent },
      { path: 'account', component: AccountComponent },
      { path: 'content/:type', component: ContentComponent}
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
