import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatIconModule,
  MatListModule, MatMenuModule,
} from '@angular/material';
import {
  RouterModule,
  Routes,
} from '@angular/router';
import {RewardsModule, UtilsModule} from '@perx/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


import { CatalogComponent, CatalogRewardCardComponent } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CatalogComponent
}];

@NgModule({
  declarations: [
    CatalogComponent,
    CatalogRewardCardComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    RewardsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    InfiniteScrollModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }