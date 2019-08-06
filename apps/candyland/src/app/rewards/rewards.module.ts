import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsListPageComponent } from './containers/rewards-list-page/rewards-list-page.component';
import { RewardsListComponent } from './components/rewards-list/rewards-list.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';
import { NewRewardComponent } from './containers/new-reward/new-reward.component';
import { ItemListModule } from '@cl-shared/components/item-list/item-list.module';
import { TimePickerModule } from '@cl-shared/components/time-picker/time-picker.module';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';
import { UploadFileModule } from '@cl-shared/components/upload-file/upload-file.module';
import { UploadGraphicModule } from '@cl-shared/components/upload-graphic/upload-graphic.module';
import { RewardInfoFormGroupComponent } from './components/reward-info-form-group/reward-info-form-group.component';
import { RewardMerchantCardComponent } from 'src/app/rewards/components/reward-merchant-card/reward-merchant-card.component';
import { LimitFormGroupComponent } from './components/limit-form-group/limit-form-group.component';
import { VoucherValidityFormGroupComponent } from './components/voucher-validity-form-group/voucher-validity-form-group.component';
import { RewardDetailPageComponent } from './containers/reward-detail-page/reward-detail-page.component';
import { RewardsCampaignsListComponent } from 'src/app/rewards/components/rewards-campaigns-list/rewards-campaigns-list.component';
import { RewardMerchantItemComponent } from 'src/app/rewards/components/reward-merchant-item/reward-merchant-item.component';
import { RewardInfoPreviewComponent } from 'src/app/rewards/components/reward-info-preview/reward-info-preview.component';
import { RewardLimitsPreviewComponent } from 'src/app/rewards/components/reward-limits-preview/reward-limits-preview.component';
import { RewardVouchersPreviewComponent } from './components/reward-vouchers-preview/reward-vouchers-preview.component';
import { DownloadButtonModule } from '@cl-shared/components/download-button/download-button.module';
import { RewardReplenishPopupComponent } from 'src/app/rewards/containers/reward-replenish-popup/reward-replenish-popup.component';
import { CreateMerchantPopupModule } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.module';
import { SelectMerchantModule } from '@cl-shared/containers/select-merchant/select-merchant.module';
import {
  RewardVoucherCodeFormGroupComponent
} from 'src/app/rewards/components/reward-voucher-code-form-group/reward-voucher-code-form-group.component';
import { VouchersProgressBarModule } from '@cl-shared/components/vouchers-progress-bar/vouchers-progress-bar.module';
import { NewRewardFormService } from './services/new-reward-form.service';

@NgModule({
  providers: [
    NewRewardFormService
  ],
  declarations: [
    RewardsListPageComponent,
    RewardsListComponent,
    NewRewardComponent,
    RewardInfoFormGroupComponent,
    RewardMerchantCardComponent,
    LimitFormGroupComponent,
    VoucherValidityFormGroupComponent,
    RewardDetailPageComponent,
    RewardsCampaignsListComponent,
    RewardMerchantItemComponent,
    RewardInfoPreviewComponent,
    RewardLimitsPreviewComponent,
    RewardVouchersPreviewComponent,
    RewardReplenishPopupComponent,
    RewardVoucherCodeFormGroupComponent
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
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    TimePickerModule,
    DatePickerModule,
    UploadFileModule,
    UploadGraphicModule,
    DownloadButtonModule,
    CreateMerchantPopupModule,
    SelectMerchantModule,
    VouchersProgressBarModule
  ],
  entryComponents: [
    RewardReplenishPopupComponent
  ]
})
export class RewardsModule {
}
