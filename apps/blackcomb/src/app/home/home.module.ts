import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { LoyaltyModule, RewardsModule, UtilsModule } from '@perx/core';
import { HomeComponent, GamesCollectionComponent } from '@perx/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}];

@NgModule({
  declarations: [
    HomeComponent,
    GamesCollectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    LoyaltyModule,
    UtilsModule,
    RewardsModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent
  ]
})
export class HomeModule { }
