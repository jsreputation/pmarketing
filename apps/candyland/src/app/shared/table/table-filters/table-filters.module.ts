import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFiltersComponent } from './table-filters.component';
import { TableFilterDirective } from './table-filter.directive';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableFiltersComponent, TableFilterDirective],
  exports: [TableFiltersComponent, TableFilterDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class TableFiltersModule { }
