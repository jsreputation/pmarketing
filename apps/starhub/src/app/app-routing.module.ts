import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { RewardComponent } from './reward/reward.component';
import { VoucherComponent } from './voucher/voucher.component';
import { LocationsComponent } from './locations/locations.component';
import { TncComponent } from './tnc/tnc.component';
import { RedemptionComponent } from './redemption/redemption.component';
import { GameComponent } from './game/game.component';
import { CongratsComponent } from './congrats/congrats.component';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule) },
  { path: 'category', component: CategoryComponent },
  { path: 'reward', component: RewardComponent },
  { path: 'voucher', component: VoucherComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'tnc', component: TncComponent },
  { path: 'redemption', component: RedemptionComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'game', component: GameComponent },
  { path: 'congrats', component: CongratsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
