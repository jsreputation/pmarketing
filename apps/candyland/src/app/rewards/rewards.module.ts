import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsListModule } from '@cl-shared/components/rewards-list/rewards-list.module';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { RewardsRoutingModule } from './rewards-routing.module';
import { RewardsListPageComponent } from './containers/rewards-list-page/rewards-list-page.component';
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
  MatTableModule,
  MatProgressBarModule
} from '@angular/material';
import { RewardInfoFormGroupComponent } from './components/reward-info-form-group/reward-info-form-group.component';
import { RewardMerchantCardComponent } from 'src/app/rewards/components/reward-merchant-card/reward-merchant-card.component';
import { LimitFormGroupComponent } from './components/limit-form-group/limit-form-group.component';
import { VoucherValidityFormGroupComponent } from './components/voucher-validity-form-group/voucher-validity-form-group.component';

import {
  RewardVoucherCodeFormGroupComponent
} from 'src/app/rewards/components/reward-voucher-code-form-group/reward-voucher-code-form-group.component';
import { NewRewardFormService } from './services/new-reward-form.service';
import { ManageRewardsComponent } from './containers/manage-rewards/manage-rewards.component';
import { RewardDetailPageComponent } from './containers/reward-detail-page/reward-detail-page.component';
import { RewardsCampaignsListComponent } from './components/rewards-campaigns-list/rewards-campaigns-list.component';
import { RewardMerchantItemComponent } from './components/reward-merchant-item/reward-merchant-item.component';
import { RewardLimitsPreviewComponent } from './components/reward-limits-preview/reward-limits-preview.component';
import { RewardInfoPreviewComponent } from './components/reward-info-preview/reward-info-preview.component';
import { RewardVouchersPreviewComponent } from './components/reward-vouchers-preview/reward-vouchers-preview.component';
import { RewardReplenishPopupComponent } from './containers/reward-replenish-popup/reward-replenish-popup.component';
import {
  ButtonModule, CreateMerchantPopupModule,
  DatePickerModule, DownloadButtonModule,
  ItemListModule, NoDataModule,
  ProgressBarModule, SearchFilterModule, SelectMerchantPopupModule,
  StatusLabelModule, TableFiltersModule,
  TimePickerModule,
  UploadFileModule, UploadGraphicModule, VouchersProgressBarModule
} from '@cl-shared';
import { TagListModule } from '@cl-shared/components/tag-list/tag-list.module';
import { RewardLoyaltyFormGroupComponent } from './components/reward-loyalty-form-group/reward-loyalty-form-group.component';
import { MatTabsModule } from '@angular/material/tabs';
import { RewardLoyaltySetupGroupComponent } from './components/reward-loyalty-setup-group/reward-loyalty-setup-group.component';
import { TranslateModule } from '@ngx-translate/core';
import { VouchersUploadService } from '@cl-core/services/vouchers-upload.service';
import { IAdvancedUploadFileService } from '@cl-core/services/iadvanced-upload-file.service';
import { MessageService } from '@cl-core-services';

@NgModule({
  providers: [
    NewRewardFormService,
    MessageService,
    { provide: IAdvancedUploadFileService, useClass: VouchersUploadService }
  ],
  declarations: [
    RewardsListPageComponent,
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
    RewardVoucherCodeFormGroupComponent,
    ManageRewardsComponent,
    RewardLoyaltyFormGroupComponent,
    RewardLoyaltySetupGroupComponent,
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    RewardsListModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSlideToggleModule,
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    ButtonModule,
    NoDataModule,
    ProgressBarModule,
    ItemListModule,
    TimePickerModule,
    DatePickerModule,
    UploadFileModule,
    UploadGraphicModule,
    DownloadButtonModule,
    CreateMerchantPopupModule,
    SelectMerchantPopupModule,
    VouchersProgressBarModule,
    PaginationModule,
    PipesModule,
    TagListModule,
    MatTabsModule,
    TranslateModule,
    MatProgressBarModule
  ],
  entryComponents: [
    RewardReplenishPopupComponent
  ]
})
export class RewardsModule {
}
