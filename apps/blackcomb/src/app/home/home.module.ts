import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { LoyaltyModule, RewardsModule } from '@perx/core';
import { HomeComponent, GamesCollectionComponent } from '@perx/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';

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
    RewardsModule,
    MatCardModule,
    MatButtonModule,
    TranslateModule.forChild(),
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent
  ]
})
export class HomeModule { }
