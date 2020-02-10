import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatListModule,
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
    InfiniteScrollModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }
