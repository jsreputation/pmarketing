import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatPaginatorModule,
  MatTableModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { RewardsListModule } from '@cl-shared/components/rewards-list/rewards-list.module';
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
    MatPaginatorModule,
    SearchFilterModule,
    ButtonModule,
    MatFormFieldModule,
    TableFiltersModule,
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
