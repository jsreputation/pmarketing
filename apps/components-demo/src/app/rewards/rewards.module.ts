import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsComponent } from './rewards.component';
import { RewardsCarouselComponent } from './rewards-carousel/rewards-carousel.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { HttpClientModule } from '@angular/common/http';
import { RewardsRoutingModule } from './rewards-routing.module';
import {
  AuthenticationModule,
  RewardsModule as PerxRewardsModule
} from '@perx/core';
import { environment } from '../../environments/environment';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    RewardsComponent,
    RewardsCarouselComponent,
    RewardsListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    PerxRewardsModule.forRoot({ env: environment }),
    AuthenticationModule,
    RewardsRoutingModule
  ]
})
export class RewardsModule {
}
