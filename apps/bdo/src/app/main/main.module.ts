import { MatTabsModule } from '@angular/material/tabs';
import { TaggedItemComponent } from './home/tagged-item/tagged-item.component';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FeatureDealsComponent } from './home/featured-deals/featured-deals.component';
import { SecondaryCatalogComponent } from './home/secondary-catalog/secondary-catalog.component';
import { SearchNavbarComponent } from './search-navbar/search-navbar.component';
import { SharedModule } from '../shared/shared.module';
import { SearchHeaderComponent } from './search/search-header/search-header.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    PrimaryCatalogComponent,
    SecondaryCatalogComponent,
    SearchNavbarComponent,
    FeatureDealsComponent,
    TaggedItemComponent,
    SecondaryCatalogComponent,
    SearchHeaderComponent,
    SearchResultComponent,
    SearchComponent
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
    MatButtonModule,
    MatTabsModule,
    MatExpansionModule,
    MatTabsModule,
    SharedModule
  ],
  bootstrap: [],
})
export class MainModule {}
