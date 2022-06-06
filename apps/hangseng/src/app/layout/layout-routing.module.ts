import { ProtectedGuard } from 'ngx-auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: "",
        "pathMatch": "full",
        "redirectTo": "home"
      },
      {
        path: "account",
        loadChildren: () => import('../account/account.module').then((mod) => mod.AccountModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "badges",
        loadChildren: () => import('../badges/badges.module').then(m => m.BadgesModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "booking/:id",
        loadChildren: () => import('../rewards-booking/rewards-booking.module').then((mod) => mod.RewardsBookingModule)
      },
      {
        path: "campaign-welcome/:cid",
        loadChildren: () => import('../campaign-landing/campaign-landing.module').then((mod) => mod.CampaignLandingModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "catalogs",
        loadChildren: () => import('../catalog/catalog.module').then((mod) => mod.CatalogModule)
      },
      {
        path: "change-password",
        loadChildren: () => import('../change-password/change-password.module').then((mod) => mod.ChangePasswordModule)
      },
      {
        path: "edit-profile/:type",
        loadChildren: () => import('../edit-profile-field/edit-profile-field.module').then((mod) => mod.EditProfileFieldModule)
      },
      {
        path: "favorite-rewards",
        loadChildren: () => import('../favorite-rewards/favorite-rewards.module').then((mod) => mod.FavoriteRewardsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "find-out-more",
        loadChildren: () => import('../find-more/find-more.module').then((mod) => mod.FindMoreModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "game/:id",
        loadChildren: () => import('../game/game.module').then((mod) => mod.GameModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "give_reward/:id",
        loadChildren: () => import('../instant-reward/instant-reward.module').then((mod) => mod.InstantRewardModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "history",
        loadChildren: () => import('../history/history.module').then((mod) => mod.HistoryModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "home",
        loadChildren: () => import('../home/home.module').then((mod) => mod.HomeModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "large-vouchers",
        loadChildren: () => import('../large-vouchers/large-vouchers.module').then((mod) => mod.LargeVouchersModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "leaderboard/:id",
        loadChildren: () => import('../leaderboard/leaderboard.module').then(m => m.LeaderboardModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "legacy-progress-campaign/:id",
        loadChildren: () => import('../legacy-progress-campaign/legacy-progress-campaign.module').then((mod) => mod.LegacyProgressCampaignModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "legacy-progress-campaigns",
        loadChildren: () => import('../legacy-progress-campaign-home/legacy-progress-campaign-home.module').then((mod) => mod.LegacyProgressCampaignHomeModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "locations",
        loadChildren: () => import('../locations/locations.module').then((mod) => mod.LocationsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "lucky-draw",
        loadChildren: () => import('../lucky-draw-details/lucky-draw-details.module').then((mod) => mod.LuckyDrawDetailsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "pi",
        loadChildren: () => import('../pi/pi.module').then((mod) => mod.PiModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "points",
        loadChildren: () => import('../points/points.module').then(m => m.PointsModule)
      },
      {
        path: "prize-set-outcomes/:id",
        loadChildren: () => import('../prize-set-outcome/prize-set-outcome.module').then(m => m.PrizeSetOutcomeModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "instant-reward-outcomes/:id",
        loadChildren: () => import('../instant-reward-outcome/instant-reward-outcome.module').then(m => m.InstantRewardOutcomeModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "profile",
        loadChildren: () => import('../profile/profile.module').then((mod) => mod.ProfileModule)
      },
      {
        path: "progress-campaign/:id",
        "pathMatch": "full",
        "redirectTo": "legacy-progress-campaign/:id"
      },
      {
        path: "progress/:id",
        loadChildren: () => import('../progress-campaign/progress-campaign.module').then((mod) => mod.ProgressCampaignModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "qr",
        loadChildren: () => import('../qr/qr.module').then((mod) => mod.QRModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "quest/:id",
        loadChildren: () => import('../quest/quest.module').then((mod) => mod.QuestModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "quiz-results",
        loadChildren: () => import('../quiz-result/quiz-result.module').then((m) => m.QuizResultModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "quiz/:cid",
        loadChildren: () => import('../quiz/quiz.module').then((mod) => mod.QuizModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "redeem/:id",
        loadChildren: () => import('../redeem/redeem.module').then((mod) => mod.RedeemModule),
        canActivate: [ProtectedGuard]
      },

      {
        path: "referral",
        loadChildren: () => import('../referral/referral.module').then((m) => m.ReferralModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "reward-detail/:id",
        loadChildren: () => import('../rewards-detail/rewards-detail.module').then((mod) => mod.RewardsDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "reward-voucher-detail",
        loadChildren: () => import('../reward-voucher-detail/reward-voucher-detail.module').then((mod) => mod.RewardVoucherDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "rewards",
        loadChildren: () => import('../rewards/rewards.module').then((mod) => mod.RewardsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "signup",
        loadChildren: () => import('../sign-up/sign-up.module').then((mod) => mod.SignUpModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "stamp-card/:id",
        loadChildren: () => import('../stamp/stamp.module').then((mod) => mod.StampModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "stamp/:id",
        loadChildren: () => import('../campaign-stamps/campaign-stamps.module').then((mod) => mod.CampaignStampsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "stamp/:id/read-more",
        loadChildren: () => import('../campaign-stamps-read-more/campaign-stamps-read-more.module').then((mod) => mod.CampaignStampsReadMoreModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "survey/:id",
        loadChildren: () => import('../survey/survey.module').then((mod) => mod.SurveyModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "teams",
        loadChildren: () => import('../teams/teams.module').then(m => m.TeamsModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "transaction-history",
        loadChildren: () => import('../transaction-history/transaction-history.module').then((mod) => mod.TransactionHistoryModule)
      },
      {
        path: "voucher-detail/:id",
        loadChildren: () => import('../voucher-detail/voucher-detail.module').then((mod) => mod.VoucherDetailModule),
        canActivate: [ProtectedGuard]
      },
      {
        path: "wallet",
        loadChildren: () => import('../wallet/wallet.module').then((mod) => mod.WalletModule),
        canActivate: [ProtectedGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
