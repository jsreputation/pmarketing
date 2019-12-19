import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { LoyaltyModule, RewardsModule, UtilsModule, RewardsService } from '@perx/core';
import { HomeComponent, GamesCollectionComponent } from '@perx/blackcomb-pages';
import { TranslateModule } from '@ngx-translate/core';
import { rewards } from '../mock/rewards.mock';
import { of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
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
    UtilsModule,
    InfiniteScrollModule
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent
  ],
  // don't forget to remove
  providers: [
    { provide: RewardsService, useValue: {
      getAllRewards: ()=>of([...rewards, ...rewards, ...rewards, ...rewards, ...rewards, ...rewards, ...rewards, ...rewards])
    }}
  ]
})
export class HomeModule { }
