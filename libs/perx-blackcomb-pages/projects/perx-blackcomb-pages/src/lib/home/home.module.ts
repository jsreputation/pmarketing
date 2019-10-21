import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { LoyaltyModule, RewardsModule, LoyaltyService } from '@perx/core';
import { GamesCollectionComponent } from './games-collection/games-collection.component';
import { of } from 'rxjs';

const loyaltyServiceStub = {
  getLoyalties: () => of(null)
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
    HomeComponent
  ]
})
export class HomeModule { }
