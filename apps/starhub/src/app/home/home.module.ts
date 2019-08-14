import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DiscoverComponent } from './discover/discover.component';
import { VouchersComponent } from './vouchers/vouchers.component';
import { HomeComponent } from './home/home.component';
import { MatToolbarModule, MatTabsModule } from '@angular/material';

@NgModule({
  declarations: [DiscoverComponent, VouchersComponent, HomeComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    HomeRoutingModule
  ],
  bootstrap: [
    HomeComponent
  ]
})
export class HomeModule { }
