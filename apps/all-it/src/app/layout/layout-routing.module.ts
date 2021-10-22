import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { WalletGuard } from '../wallet.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', loadChildren: () => import('../home/home.module').then((mod) => mod.HomeModule) },
      {
        path: 'rewards', loadChildren: () => import('../rewards/rewards.module').then(mod => mod.RewardsModule),
      },
      {
        path: "badges",
        loadChildren: () => import('../badges/badges.module').then(m => m.BadgesModule)
      },
      {
        path: 'catalogs',
        loadChildren: () => import('../catalog/catalog.module')
          .then(mod => mod.CatalogModule)
      },
      { path: 'wallet', loadChildren: () => import('../wallet/wallet.module').then((mod) => mod.WalletModule), canActivate: [WalletGuard] },
      {
        path: 'voucher-detail/:id',
        loadChildren: () => import('../voucher-detail/voucher-detail.module').then((mod) => mod.VoucherDetailModule)
      },
      { path: 'history', loadChildren: () => import('../history/history.module').then((mod) => mod.HistoryModule) },
      {
        path: "leaderboard/:id",
        loadChildren: () => import('../leaderboard/leaderboard.module').then(m => m.LeaderboardModule)
      },
      {
        path: "leaderboards",
        loadChildren: () => import('../leaderboards/leaderboards.module').then(m => m.LeaderboardsModule)
      },
      {
        path: "leaderboards/:id",
        loadChildren: () => import('../leaderboards/leaderboards.module').then(m => m.LeaderboardsModule)
      },
      { path: 'pi', loadChildren: () => import('../pi/pi.module').then((mod) => mod.PiModule) },
      {
        path: "progress-campaigns",
        loadChildren: () => import('../progress-campaign-home/progress-campaign-home.module').then((mod) => mod.ProgressCampaignHomeModule)
      },
      {
        path: "progress/:id",
        loadChildren: () => import('../progress-campaign/progress-campaign.module').then((mod) => mod.ProgressCampaignModule)
      },
      {
        path: 'redeem/:id', loadChildren: () => import('../redeem/redeem.module').then((mod) => mod.RedeemModule),
      },
      {
        path: 'qr',
        loadChildren: () => import('../qr/qr.module').then((mod) => mod.QRModule)
      },
      {
        path: "quest/:id",
        loadChildren: () => import('../quest/quest.module').then((mod) => mod.QuestModule)
      },
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then((mod) => mod.AccountModule)
      },
      {
        path: 'stamp/:id',
        loadChildren: () => import('../stamp/stamp.module').then((mod) => mod.StampModule),
      },
      {
        path: 'survey/:id',
        loadChildren: () => import('../survey/survey.module').then((mod) => mod.SurveyModule),
      },
      {
        path: 'game/:id',
        loadChildren: () => import('../game/game.module').then((mod) => mod.GameModule),
      },
      {
        path: 'give_reward/:id',
        loadChildren: () => import('../instant-reward/instant-reward.module').then((mod) => mod.InstantRewardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then((mod) => mod.ProfileModule)
      },
      {
        path: 'transaction-history',
        loadChildren: () => import('../transaction-history/transaction-history.module').then((mod) => mod.TransactionHistoryModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('../change-password/change-password.module')
          .then((mod) => mod.ChangePasswordModule)
      },
      {
        path: 'barcode',
        loadChildren: () => import('../barcode/barcode.module').then((mod) => mod.BarcodeModule)
      },
      {
        path: 'edit-profile/:type',
        loadChildren: () => import('../edit-profile-field/edit-profile-field.module').then((mod) => mod.EditProfileFieldModule)
      },
      {
        path: 'reward-detail/:id',
        loadChildren: () => import('../rewards-detail/rewards-detail.module').then((mod) => mod.RewardsDetailModule)
      },
      {
        path: 'booking/:id',
        loadChildren: () => import('../rewards-booking/rewards-booking.module').then((mod) => mod.RewardsBookingModule)
      },
      {
        path: 'favorite-rewards',
        loadChildren: () => import('../favorite-rewards/favorite-rewards.module').then((mod) => mod.FavoriteRewardsModule)
      },
      {
        path: 'referral',
        loadChildren: () => import('../referral/referral.module').then(mod => mod.ReferralModule)
      },
      {
        path: 'campaign-welcome/:cid',
        loadChildren: () => import('../campaign-landing/campaign-landing.module').then(mod => mod.CampaignLandingModule)
      },
      { path: 'quiz/:cid',
        loadChildren: () => import('../quiz/quiz.module').then(m => m.QuizModule)
      },
      { path: 'quiz-results',
        loadChildren: () => import('../quiz-result/quiz-result.module').then(m => m.QuizResultModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
