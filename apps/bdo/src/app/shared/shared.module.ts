import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LargeListItemComponent } from './components/large-list-item/large-list-item.component';
import { TaggedItemComponent } from './components/tagged-item/tagged-item.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FilterService } from './services/filter.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { CheckboxGroupComponent } from './components/filter/checkbox-group/checkbox-group.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { GhostCardComponent } from './components/ghosts/card-ghost.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MeterToKilometerPipe } from './pipe/meter-to-kilometer.pipe';
import { MerchantLocationPageComponent } from './components/merchant-location-page/merchant-location-page.component';
import { LocationModule, MerchantsModule } from '@perxtech/core';

@NgModule({
  declarations: [
    ListItemComponent,
    LargeListItemComponent,
    TaggedItemComponent,
    SearchResultComponent,
    SearchResultComponent,
    CheckboxGroupComponent,
    FilterComponent,
    FooterComponent,
    GhostCardComponent,
    MeterToKilometerPipe,
    MerchantLocationPageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule,
    LocationModule,
    MerchantsModule.forChild(), //required for location module
    MatChipsModule
  ],
  exports: [
    ListItemComponent,
    LargeListItemComponent,
    TaggedItemComponent,
    FilterComponent,
    CheckboxGroupComponent,
    TaggedItemComponent,
    SearchResultComponent,
    MatTabsModule,
    FooterComponent,
    MeterToKilometerPipe
  ],
  providers: [FilterService],
})
export class SharedModule {}
