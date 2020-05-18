import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule, MatListModule, MatMenuModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { RewardsModule, UtilsModule, SettingsModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CatalogRewardCardComponent } from './catalog-reward-card/catalog-reward-card.component';
import { CatalogComponent } from './catalog.component';

@NgModule({
  declarations: [CatalogComponent, CatalogRewardCardComponent],
  exports: [CatalogComponent],
  imports: [
    CommonModule,
    RouterModule,
    UtilsModule,
    SettingsModule,
    RewardsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    InfiniteScrollModule,
  ]
})
export class CatalogModule { }
