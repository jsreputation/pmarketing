import { MatTabsModule } from '@angular/material/tabs';
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
import { CommonModule } from '@angular/common';
import { FeatureDealsComponent } from './home/featured-deals/featured-deals.component';
import { SecondaryCatalogComponent } from './home/secondary-catalog/secondary-catalog.component';
import { SearchNavbarComponent } from './search-navbar/search-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchHeaderComponent } from './search/search-header/search-header.component';
import { SearchResultComponent } from './search/search-result/search-result.component';
import { SearchComponent } from './search/search.component';
import { FilterComponent } from './filter/filter.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';
import { NearbyDealsComponent } from './nearby-deals/nearby-deals.component';
import { MapComponent } from './nearby-deals/map/map.component';
import { TreatWelcomeComponent } from './treat-welcome/treat-welcome.component';
import { TreatEnrollPageComponent } from './treat-enroll-page/treat-enroll-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { CheckboxGroupComponent } from './filter/checkbox-group/checkbox-group.component';
import {MatChipsModule} from '@angular/material/chips';
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
    SearchResultComponent,
    SearchComponent,
    DealLandingComponent,
    NearbyDealsComponent,
    MapComponent,
    TreatWelcomeComponent,
    TreatEnrollPageComponent,
    FilterComponent,
    CheckboxGroupComponent
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
    SharedModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  bootstrap: [],
})
export class MainModule {}
