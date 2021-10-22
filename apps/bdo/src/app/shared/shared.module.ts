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
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ListItemComponent,
    LargeListItemComponent,
    TaggedItemComponent,
    SearchResultComponent,
    SearchResultComponent,
    CheckboxGroupComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule,
    RouterModule
  ],
  exports: [
    ListItemComponent, 
    LargeListItemComponent, 
    TaggedItemComponent,
    FilterComponent,
    CheckboxGroupComponent,
    TaggedItemComponent,
    SearchResultComponent,
    MatTabsModule
  ],
  providers: [FilterService],
})
export class SharedModule {}
