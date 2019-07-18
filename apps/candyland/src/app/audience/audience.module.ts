import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudienceRoutingModule } from './audience-routing.module';
import { ChangeExpiryDatePopupComponent } from './containers/change-expiry-date-popup/change-expiry-date-popup.component';
import { AddUserPopupComponent } from './containers/add-user-popup/add-user-popup.component';
import { ManageListPopupComponent } from './containers/manage-list-popup/manage-list-popup.component';
import { AudiencesListComponent } from './containers/audiences-list/audiences-list.component';
import { AudiencesPageComponent } from './containers/audiences-page/audiences-page.component';
import { AudiencesUsersListComponent } from './containers/audiences-users-list/audiences-users-list.component';
import { AudiencesUserInfoComponent } from './containers/audiences-user-info/audiences-user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule, MatPaginatorModule, MatSelectModule, MatSortModule, MatTableModule
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';
import { UploadFileModule } from '@cl-shared/components/upload-file/upload-file.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';

@NgModule({
  declarations: [
    ChangeExpiryDatePopupComponent,
    AddUserPopupComponent,
    ManageListPopupComponent,
    AudiencesListComponent,
    AudiencesPageComponent,
    AudiencesUsersListComponent,
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
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    TabsFilterModule,
    ButtonModule,
    MatCheckboxModule,
    DatePickerModule,
    UploadFileModule,
    NoDataModule
  ],
  entryComponents: [
    ChangeExpiryDatePopupComponent,
    AddUserPopupComponent
  ]
})
export class AudienceModule { }
