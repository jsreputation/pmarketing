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
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'game', component: GameComponent, canActivate: [ProtectedGuard] },
  { path: 'congrats', component: CongratsComponent, canActivate: [ProtectedGuard] },
  { path: 'vouchers', component: VouchersComponent, canActivate: [ProtectedGuard] },
  { path: 'vouchers/:id', component: VoucherComponent, canActivate: [ProtectedGuard] },
  { path: 'activation', component: ActivationCodeComponent, canActivate: [ProtectedGuard] },
  { path: 'redemption', component: RedemptionComponent, canActivate: [ProtectedGuard] },
  { path: 'tnc', component: TncComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
