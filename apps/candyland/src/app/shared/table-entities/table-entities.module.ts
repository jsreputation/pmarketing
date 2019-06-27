import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsFilterComponent } from './tabs-filter/tabs-filter.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { MatFormFieldModule, MatInputModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [TabsFilterComponent, SearchFilterComponent],
  exports: [TabsFilterComponent, SearchFilterComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
  ]
})
export class TableEntitiesModule { }
