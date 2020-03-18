import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudienceRoutingModule } from './audience-routing.module';
import { ChangeExpiryDatePopupComponent } from './containers/change-expiry-date-popup/change-expiry-date-popup.component';
import { UpsertUserPopupComponent } from './containers/upsert-user-popup/upsert-user-popup.component';
import { ManageListPopupComponent } from './containers/manage-list-popup/manage-list-popup.component';
import { AudiencesListComponent } from './components/audiences-list/audiences-list.component';
import { AudiencesPageComponent } from './containers/audiences-page/audiences-page.component';
import { AudiencesUsersListComponent } from './components/audiences-users-list/audiences-users-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule
} from '@angular/material';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule, StatusLabelModule } from '@perxtech/candyshop';
import { UploadFileModule } from '@cl-shared/components/upload-file/upload-file.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { AudiencesUserInfoComponent } from './components/audiences-user-info/audiences-user-info.component';
import { AudiencesUserInfoPageComponent } from './containers/audiences-user-info-page/audiences-user-info-page.component';
import { AudiencesVouchersListComponent } from './components/audiences-vouchers-list/audiences-vouchers-list.component';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';
import { SelectRewardPopupModule } from '@cl-shared/containers/select-reward-popup/select-reward-popup.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { TranslateModule } from '@ngx-translate/core';
import { IAdvancedUploadFileService } from '@cl-core/services/iadvanced-upload-file.service';
import { UsersUploadService } from '@cl-core/services/users-upload.service';
import { MessageService } from '@cl-core-services';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { AudiencesCommunicationsListComponent } from './components/audiences-communications-list/audiences-communications-list.component';
import { SendMessagePopupComponent } from './containers/send-message-popup/send-message-popup.component';
import { AudiencesLoyaltyItemComponent } from './components/audiences-loyalty-item/audiences-loyalty-item.component';
import { AudiencesLoyaltyGridComponent } from './components/audiences-loyalty-grid/audiences-loyalty-grid.component';
import { AddLoyaltyPopupComponent } from './containers/add-loyalty-popup/add-loyalty-popup.component';
import { AdjustBalancePointsPopupComponent } from './containers/adjust-balance-points-popup/adjust-balance-points-popup.component';
import { AdjustLoyaltyTierPopupComponent } from './containers/adjust-loyalty-tier-popup/adjust-loyalty-tier-popup.component';

@NgModule({
  declarations: [
    ChangeExpiryDatePopupComponent,
    SendMessagePopupComponent,
    UpsertUserPopupComponent,
    ManageListPopupComponent,
    AudiencesListComponent,
    AudiencesPageComponent,
    AudiencesUsersListComponent,
    AudiencesUserInfoPageComponent,
    AudiencesVouchersListComponent,
    AudiencesUserInfoComponent,
    AudiencesCommunicationsListComponent,
    SendMessagePopupComponent,
    AudiencesLoyaltyItemComponent,
    AudiencesLoyaltyGridComponent,
    AddLoyaltyPopupComponent,
    AdjustBalancePointsPopupComponent,
    AdjustLoyaltyTierPopupComponent
  ],
  imports: [
    CommonModule,
    AudienceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    TabsFilterModule,
    ButtonModule,
    MatCheckboxModule,
    UploadFileModule,
    NoDataModule,
    MatTabsModule,
    DatePickerModule,
    SelectRewardPopupModule,
    PaginationModule,
    TranslateModule,
    PipesModule
  ],
  entryComponents: [
    ChangeExpiryDatePopupComponent,
    SendMessagePopupComponent,
    UpsertUserPopupComponent,
    ManageListPopupComponent,
    AddLoyaltyPopupComponent,
    AdjustBalancePointsPopupComponent,
    AdjustLoyaltyTierPopupComponent
  ],
  providers: [
    MessageService,
    { provide: IAdvancedUploadFileService, useClass: UsersUploadService }
  ]
})
export class AudienceModule {
}
