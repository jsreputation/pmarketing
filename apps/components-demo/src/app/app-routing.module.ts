import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ProtectedGuard } from 'ngx-auth';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
    // redirectTo: '', pathMatch: 'full',
    // canActivate: [ProtectedGuard]
  },
  {
    path: 'rewards', loadChildren: () => import('./rewards/rewards.module').then(mod => mod.RewardsModule),
    // canActivate: [ProtectedGuard]
  },
  {
    path: 'utils', loadChildren: () => import('./utils/utils.module').then(mod => mod.UtilsModule)
  },
  {
    path: 'games', loadChildren: () => import('./games/games.module').then(mod => mod.GamesModule)
  },
  {
    path: 'stamps', loadChildren: () => import('./stamps/stamps.module').then(mod => mod.StampsModule)
  },
  {
    path: 'voucher', loadChildren: () => import('./voucher/voucher.module').then(mod => mod.VoucherModule)
  },
  {
    path: 'location', loadChildren: () => import('./location/location.module').then(mod => mod.LocationModule)
  },
  {
    path: 'loyalty', loadChildren: () => import('./loyalty/loyalty.module').then(mod => mod.LoyaltyModule)
  },
  {
    path: 'survey', loadChildren: () => import('./survey/survey.module').then(mod => mod.SurveyModule)
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'pages', loadChildren: () => import('./pages/pages.module').then(mod => mod.PagesModule)
  },
  { path: 'quiz', loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
