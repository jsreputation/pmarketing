import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LoyaltyModule, ProfileModule, ProfileService, RewardsModule } from '@perx/core';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LoyaltyModule.forRoot({env: environment}),
    ProfileModule.forRoot({ env: environment }),
    RewardsModule.forRoot({ env: environment })
  ],
 
})
export class HomeModule { }
