import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { RewardComponent } from './reward/reward.component';
import { VoucherComponent } from './voucher/voucher.component';
import { LocationsComponent } from './locations/locations.component';
import { TncComponent } from './tnc/tnc.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { CongratsComponent } from './congrats/congrats.component';
import { ErrorComponent } from './error/error.component';
import { StampCardComponent } from './stamp/stamp-card.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) },
  { path: 'category', component: CategoryComponent },
  { path: 'reward', component: RewardComponent },
  { path: 'voucher', component: VoucherComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'tnc', component: TncComponent },
  { path: 'redemption', component: RedemptionComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'game', loadChildren: () => import('./game/game.module').then(mod => mod.SHGameModule) },
  { path: 'stamp/:id', loadChildren: () => import('./stamp/stamps.module').then(mod => mod.SHStampsModule) },
  { path: 'survey/:id', loadChildren: () => import('./survey/survey.module').then(mod => mod.SHSurveyModule) },
  { path: 'quiz/:id', loadChildren: () => import('./quiz/quiz.module').then(mod => mod.SHQuizModule) },
  { path: 'stamp-card/:id', component: StampCardComponent },
  { path: 'congrats', component: CongratsComponent },
  { path: 'error', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
