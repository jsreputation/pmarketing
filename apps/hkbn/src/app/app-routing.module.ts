import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/containers/login/login.component';
import { ContentContainerComponent } from './ui/content-container/content-container.component';
import { HomeComponent } from './home/containers/home/home.component';
import { EnlargedQrComponent } from './home/containers/enlarged-qr/enlarged-qr.component';
import { WalletComponent } from './wallet/wallet.component';
import { VoucherDetailsComponent } from './wallet/voucher-details/voucher-details.component';

const routes: Routes = [
  {
    path: '', component: ContentContainerComponent, children: [
      {path: '', component: HomeComponent},
      {
        path: 'qr', component: EnlargedQrComponent, data: {
          cross: true,
          backUrl: ''
        }
      },
      {path: 'wallet', component: WalletComponent},
      {
        path: 'wallet/:id', component: VoucherDetailsComponent, data: {
          back: true,
          backUrl: '/wallet'
        }
      },
      {
        path: 'reward/:id', loadChildren: () => import('./reward/reward.module').then((m) => m.RewardModule)
      }
    ]
  },
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
