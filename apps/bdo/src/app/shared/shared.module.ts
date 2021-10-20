import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './components/list-item/list-item.component';
import { LargeListItemComponent } from './components/large-list-item/large-list-item.component';
import { TaggedItemComponent } from './components/tagged-item/tagged-item.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from './components/filter/filter.component';
import { CheckboxGroupComponent } from './components/filter/checkbox-group/checkbox-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    ListItemComponent,
    LargeListItemComponent,
    TaggedItemComponent,
    FilterComponent,
    SearchResultComponent,
    CheckboxGroupComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTabsModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatCheckboxModule],
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
  providers: [],
})
export class SharedModule {}
