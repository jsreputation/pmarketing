import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RewardsRoutingModule} from './rewards-routing.module';
import {RewardsListPageComponent} from './containers/rewards-list-page/rewards-list-page.component';
import {AddRewardPopupComponent} from './containers/add-reward-popup/add-reward-popup.component';
import {RewardsListComponent} from './components/rewards-list/rewards-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {StatusLabelModule} from '@cl-shared/components/status-label/status-label.module';
import {TableFiltersModule} from '@cl-shared/table/table-filters/table-filters.module';
import {SearchFilterModule} from '@cl-shared/table/search-filter/search-filter.module';
import {ButtonModule} from '@cl-shared/components/button/button.module';
import {NoDataModule} from '@cl-shared/table/no-data/no-data.module';
import {ProgressBarModule} from '@cl-shared/components/progress-bar/progress-bar.module';
import {NewRewardComponent} from './containers/new-reward/new-reward.component';
import {ItemListModule} from '@cl-shared/components/item-list/item-list.module';
import {TimePickerModule} from '@cl-shared/components/time-picker/time-picker.module';
import {DatePickerModule} from '@cl-shared/components/date-picker/date-picker.module';
import {UploadFileModule} from '@cl-shared/components/upload-file/upload-file.module';
import {UploadGraphicModule} from '@cl-shared/components/upload-graphic/upload-graphic.module';
import {RewardInfoFormGroupComponent} from './components/reward-info-form-group/reward-info-form-group.component';
import {MerchantInfoFormGroupComponent} from './components/merchant-info-form-group/merchant-info-form-group.component';
import {LimitFormGroupComponent} from './components/limit-form-group/limit-form-group.component';
import {VoucherValidityFormGroupComponent} from './components/voucher-validity-form-group/voucher-validity-form-group.component';
import {RewardDetailPageComponent} from './containers/reward-detail-page/reward-detail-page.component';

@NgModule({
  declarations: [
    RewardsListPageComponent,
    AddRewardPopupComponent,
    RewardsListComponent,
    NewRewardComponent,
    RewardInfoFormGroupComponent,
    MerchantInfoFormGroupComponent,
    LimitFormGroupComponent,
    VoucherValidityFormGroupComponent,
    RewardDetailPageComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    NoDataModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    ProgressBarModule,
    MatInputModule,
    ItemListModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    TimePickerModule,
    DatePickerModule,
    UploadFileModule,
    UploadGraphicModule
  ],
  entryComponents: [
    AddRewardPopupComponent
  ]
})
export class RewardsModule {
}
