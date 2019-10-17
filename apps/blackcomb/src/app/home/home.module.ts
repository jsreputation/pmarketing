import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { LoyaltyModule, RewardsModule, LoyaltyService } from '@perx/core';
import { of } from 'rxjs';
import { loyalty } from '../mock/loyalty.mock';
import { HomeComponent, GamesCollectionComponent } from '@perx/blackcomb-pages';

const loyaltyServiceStub = {
  getLoyalties: () => of([loyalty])
};

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
    MatButtonModule
  ],
  providers: [
    { provide: LoyaltyService, useValue: loyaltyServiceStub }
  ],
  exports: [
    HomeComponent,
    GamesCollectionComponent
  ]
})
export class HomeModule { }
