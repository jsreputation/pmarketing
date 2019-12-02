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
  MatMenuModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule, MatSnackBarModule
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { UploadFileModule } from '@cl-shared/components/upload-file/upload-file.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { AudiencesUserInfoComponent } from './components/audiences-user-info/audiences-user-info.component';
import { AudiencesUserInfoPageComponent } from './containers/audiences-user-info-page/audiences-user-info-page.component';
import { AudiencesVouchersListComponent } from './components/audiences-vouchers-list/audiences-vouchers-list.component';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';
import { SelectRewardPopupModule } from '@cl-shared/containers/select-reward-popup/select-reward-popup.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChangeExpiryDatePopupComponent,
    UpsertUserPopupComponent,
    ManageListPopupComponent,
    AudiencesListComponent,
    AudiencesPageComponent,
    AudiencesUsersListComponent,
    AudiencesUserInfoPageComponent,
    AudiencesVouchersListComponent,
    AudiencesUserInfoComponent
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
    MatSnackBarModule,
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
  ],
  entryComponents: [
    ChangeExpiryDatePopupComponent,
    UpsertUserPopupComponent,
    ManageListPopupComponent,
  ]
})
export class AudienceModule {
}
