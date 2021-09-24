import { NgModule } from '@angular/core';
import { PrimaryCatalogComponent } from './home/primary-catalog/primary-catalog.component';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main.component';
import { MatCardModule } from '@angular/material/card';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    PrimaryCatalogComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    InfiniteScrollModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  bootstrap: []
})
export class MainModule {
}
