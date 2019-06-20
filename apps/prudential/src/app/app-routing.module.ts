import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';
import { ActivationCodeComponent } from './activation-code/activation-code.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { TncComponent } from './tnc/tnc.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { LoginComponent } from './login/login.component';
import { ProtectedGuard } from 'ngx-auth';

const routes: Routes = [
  { path: '',
    children: [
      { path: '', redirectTo: 'game', pathMatch: 'full' },
      { path: 'activation', component: ActivationCodeComponent },
      { path: 'congrats', component: CongratsComponent },
      { path: 'game', component: GameComponent},
      { path: 'redemption', component: RedemptionComponent },
      { path: 'vouchers', component: VouchersComponent },
      { path: 'vouchers/:id', component: VoucherComponent },
    ],
    canActivate: [ProtectedGuard]
  },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tnc', component: TncComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
