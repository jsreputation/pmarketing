import { ProtectedGuard } from 'ngx-auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home', loadChildren: () => import('../home/home.module').then(mod => mod.HomeModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'wallet', loadChildren: () => import('../wallet/wallet.module').then(mod => mod.WalletModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'history', loadChildren: () => import('../history/history.module').then(mod => mod.HistoryModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'redeem/:id', loadChildren: () => import('../redeem/redeem.module').then(mod => mod.RedeemModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'campaign-welcome/:cid',
        loadChildren: () => import('../campaign-landing/campaign-landing.module').then(mod => mod.CampaignLandingModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'voucher-detail/:id',
        loadChildren: () => import('../voucher-detail/voucher-detail.module').then(mod => mod.VoucherDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'stamp/:id',
        loadChildren: () => import('../campaign-stamps/campaign-stamps.module').then(mod => mod.CampaignStampsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'pi', loadChildren: () => import('../pi/pi.module').then(mod => mod.PiModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'qr', loadChildren: () => import('../qr/qr.module').then(mod => mod.QRModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'account', loadChildren: () => import('../account/account.module').then(mod => mod.AccountModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'signup',
        loadChildren: () => import('../sign-up/sign-up.module').then((mod) => mod.SignUpModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'stamp-card/:id',
        loadChildren: () => import('../stamp/stamp.module').then(mod => mod.StampModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'survey/:id',
        loadChildren: () => import('../survey/survey.module').then(mod => mod.SurveyModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'game/:id',
        loadChildren: () => import('../game/game.module').then(mod => mod.GameModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'give_reward/:id',
        loadChildren: () => import('../instant-reward/instant-reward.module').then(mod => mod.InstantRewardModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'reward-detail/:id',
        loadChildren: () => import('../rewards-detail/rewards-detail.module').then(mod => mod.RewardsDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(mod => mod.ProfileModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'transaction-history',
        loadChildren: () => import('../transaction-history/transaction-history.module')
          .then(mod => mod.TransactionHistoryModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'change-password',
        loadChildren: () => import('../change-password/change-password.module')
          .then(mod => mod.ChangePasswordModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'edit-profile/:type',
        loadChildren: () => import('../edit-profile-field/edit-profile-field.module')
          .then(mod => mod.EditProfileFieldModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: 'catalogs',
        loadChildren: () => import('../catalog/catalog.module')
          .then(mod => mod.CatalogModule),
        canActivate: [ProtectedGuard]
      },
      { path: 'quiz/:cid',
        loadChildren: () => import('../quiz/quiz.module')
          .then(m => m.QuizModule),
        canActivate: [ProtectedGuard]
      },
      { path: 'quiz-results',
        loadChildren: () => import('../quiz-result/quiz-result.module')
          .then(m => m.QuizResultModule),
        canActivate: [ProtectedGuard]
      },
      { path: 'referral',
        loadChildren: () => import('../referral/referral.module')
          .then(m => m.ReferralModule),
        canActivate: [ProtectedGuard]
      },
      { path: 'lucky-draw-details',
        loadChildren: () => import('../lucky-draw-detail/lucky-draw-detail.module')
          .then(m => m.LuckyDrawDetailModule),
        canActivate: [ProtectedGuard]
      },
      { path: 'leaderboard',
        loadChildren: () => import('../leaderboard/leaderboard.module')
          .then(m => m.LeaderboardModule),
        canActivate: [ProtectedGuard]
      }]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
