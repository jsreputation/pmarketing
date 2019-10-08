import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { 
  MatTabsModule,
  MatInputModule,
  MatProgressBarModule,
  MatCardModule
} from '@angular/material';
import { 
  PagesModule as PerxPagesModule,
  GameModule,
  VouchersModule,
  RewardsModule
} from '@perx/core';
import { 
  AccountComponent,
  GameComponent,
  ShakeComponent,
  TapComponent,
  HistoryComponent, 
  ContentComponent,
  HomeComponent,
  RewardComponent
} from '@perx/blackcomb-pages';

@NgModule({
  declarations: [
    PagesComponent,
    AccountComponent,
    GameComponent,
    ShakeComponent,
    TapComponent,
    HistoryComponent,
    ContentComponent,
    HomeComponent,
    RewardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTabsModule,
    PerxPagesModule,
    MatInputModule,
    MatProgressBarModule,
    GameModule,
    VouchersModule,
    MatCardModule,
    RewardsModule
  ]
})
export class PagesModule { }
