import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRolesComponent } from './users-roles.component';
import { UsersRolesListComponent } from './components/users-roles-list/users-roles-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { RoleLabelModule } from '@cl-shared/components/role-label/role-label.module';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { InviteNewUsersPopupComponent } from './containers/invite-new-users-popup/invite-new-users-popup.component';

@NgModule({
  declarations: [
    UsersRolesComponent,
    UsersRolesListComponent,
    InviteNewUsersPopupComponent
  ],
  exports: [UsersRolesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    TableFiltersModule,
    SearchFilterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    NoDataModule,
    RoleLabelModule,
    InfoHintModule,
    MatCardModule
  ],
  entryComponents: [
    InviteNewUsersPopupComponent
  ]
})
export class UsersRolesModule { }
