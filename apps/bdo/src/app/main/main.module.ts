
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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FeatureDealsComponent } from './home/featured-deals/featured-deals.component';
import { SecondaryCatalogComponent } from './home/secondary-catalog/secondary-catalog.component';
import { SearchNavbarComponent } from './search-navbar/search-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchHeaderComponent } from './search/search-header/search-header.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';
import { NearbyDealsComponent } from './nearby-deals/nearby-deals.component';
import { MapComponent } from './nearby-deals/map/map.component';
import { TreatWelcomeComponent } from './treat-welcome/treat-welcome.component';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { TreatEnrollPageComponent } from './treat-enroll-page/treat-enroll-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { CheckboxGroupComponent } from './filter/checkbox-group/checkbox-group.component';
import {MatChipsModule} from '@angular/material/chips';
import { CategoryComponent } from './catalog-page/category/category.component';
import { SortComponent } from './catalog-page/sort/sort.component';
import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page/treat-enroll-complete-page.component';
import { RewardsModule } from '@perxtech/core';
import { CategoryHeaderComponent } from './catalog-page/category-header/category-header.component';
@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    PrimaryCatalogComponent,
    SecondaryCatalogComponent,
    SearchNavbarComponent,
    FeatureDealsComponent,
    SecondaryCatalogComponent,
    SearchHeaderComponent,
    SearchComponent,
    DealLandingComponent,
    NearbyDealsComponent,
    MapComponent,
    TreatWelcomeComponent,
    CatalogPageComponent,
    TreatEnrollPageComponent,
    FilterComponent,
    CheckboxGroupComponent,
    CategoryComponent,
    SortComponent,
    CategoryHeaderComponent,
    TreatEnrollCompletePageComponent
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
    MatExpansionModule,
    MatCheckboxModule,
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule,
    RewardsModule,
    MatSelectModule
  ],
  bootstrap: [],
})
export class MainModule {}
