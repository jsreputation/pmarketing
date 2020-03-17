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


import { CatalogComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CatalogComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    RewardsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    InfiniteScrollModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }
