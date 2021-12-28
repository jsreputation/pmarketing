import { LOCALE_ID, NgModule } from '@angular/core';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { FeatureDealsComponent } from './home/featured-deals/featured-deals.component';
import { SecondaryCatalogComponent } from './home/secondary-catalog/secondary-catalog.component';
import { SearchNavbarComponent } from './search-navbar/search-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SearchHeaderComponent } from './result/search-header/search-header.component';
import { ResultComponent } from './result/result.component';
import { DealLandingComponent } from './deal-landing/deal-landing.component';
import { NearbyDealsComponent } from './nearby-deals/nearby-deals.component';
import { TreatWelcomeComponent } from './treat-welcome/treat-welcome.component';
import { TreatEnrollPageComponent } from './treat-enroll-page/treat-enroll-page.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { NoResultComponent } from './result/no-result/no-result.component';
import { PipeUtilsModule, RewardsModule } from '@perxtech/core';
import { CatalogPageComponent } from './catalog-page/catalog-page.component';
import { CategoryComponent } from './catalog-page/category/category.component';
import { SortComponent } from './catalog-page/sort/sort.component';
import { CategoryHeaderComponent } from './catalog-page/category-header/category-header.component';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TreatEnrollCompletePageComponent } from './treat-enroll-complete-page/treat-enroll-complete-page.component';
import { SearchComponent } from './search/search.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from './nearby-deals/map/map.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatRippleModule } from '@angular/material/core';
import { RECAPTCHA_LANGUAGE, RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';

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
    ResultComponent,
    DealLandingComponent,
    NearbyDealsComponent,
    MapComponent,
    TreatWelcomeComponent,
    TreatEnrollPageComponent,
    CatalogPageComponent,
    NoResultComponent,
    CategoryComponent,
    SortComponent,
    CategoryHeaderComponent,
    TreatEnrollCompletePageComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatInputModule,
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
    MatChipsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    RewardsModule,
    MatSelectModule,
    MatBadgeModule,
    TranslateModule.forChild(),
    MatRippleModule,
    PipeUtilsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  bootstrap: [],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: RECAPTCHA_LANGUAGE,
      useFactory: (locale: string) => locale,
      deps: [LOCALE_ID],
    },
  ],
})
export class MainModule {}
