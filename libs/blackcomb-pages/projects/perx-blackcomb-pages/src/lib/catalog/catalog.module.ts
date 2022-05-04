import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RewardsModule, UtilsModule, SettingsModule, PipeUtilsModule } from '@perxtech/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CatalogRewardCardComponent } from './catalog-reward-card/catalog-reward-card.component';
import { CatalogComponent } from './catalog.component';

@NgModule({
  declarations: [CatalogComponent, CatalogRewardCardComponent],
  exports: [CatalogComponent],
  imports: [
    CommonModule,
    PipeUtilsModule,
    RouterModule,
    UtilsModule,
    SettingsModule,
    RewardsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    InfiniteScrollModule
  ]
})
export class CatalogModule { }
