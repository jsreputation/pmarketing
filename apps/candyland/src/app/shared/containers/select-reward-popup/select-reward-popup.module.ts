import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatTableModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { RewardsListModule } from '@cl-shared/components/rewards-list/rewards-list.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SelectRewardPopupComponent } from './select-reward-popup.component';

@NgModule({
  declarations: [
    SelectRewardPopupComponent
  ],
  imports: [
    CommonModule,
    RewardsListModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    SearchFilterModule,
    ButtonModule,
    MatFormFieldModule,
    TableFiltersModule,
    PaginationModule
  ],
  entryComponents: [
    SelectRewardPopupComponent
  ],
  exports: [
    SelectRewardPopupComponent
  ]
})
export class SelectRewardPopupModule {
}
