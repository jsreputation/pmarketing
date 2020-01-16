import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRolesComponent } from './users-roles.component';
import { UsersRolesListComponent } from './components/users-roles-list/users-roles-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule,
  MatMenuModule,
  MatPaginatorModule, MatRadioModule, MatSelectModule, MatSlideToggleModule,
  MatSortModule, MatStepperModule,
  MatTableModule, MatTabsModule, MatDividerModule, MatCheckboxModule
} from '@angular/material';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { RoleLabelModule } from '@cl-shared/components/role-label/role-label.module';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { InviteNewUsersPopupComponent } from './containers/invite-new-users-popup/invite-new-users-popup.component';
import { InviteNewUsersPlatformComponent } from './components/invite-new-users-platform/invite-new-users-platform.component';
import { InviteNewUsersRewardsComponent } from './components/invite-new-users-rewards/invite-new-users-rewards.component';
import { InviteNewUsersEngagementsComponent } from './components/invite-new-users-engagements/invite-new-users-engagements.component';
import { InviteNewUsersCampaignComponent } from './components/invite-new-users-campaign/invite-new-users-campaign.component';
import { InviteNewUsersLoyaltyComponent } from './components/invite-new-users-loyalty/invite-new-users-loyalty.component';
import { InviteNewUsersInsightComponent } from './components/invite-new-users-insight/invite-new-users-insight.component';
import { CheckboxGroupModule } from '@cl-shared/components/checkbox-group/checkbox-group.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UsersRolesComponent,
    UsersRolesListComponent,
    InviteNewUsersPopupComponent,
    InviteNewUsersPlatformComponent,
    InviteNewUsersRewardsComponent,
    InviteNewUsersEngagementsComponent,
    InviteNewUsersCampaignComponent,
    InviteNewUsersLoyaltyComponent,
    InviteNewUsersInsightComponent
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
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatInputModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatCheckboxModule,
    CheckboxGroupModule,
    PaginationModule,
    TranslateModule,
  ],
  entryComponents: [
    InviteNewUsersPopupComponent
  ]
})
export class UsersRolesModule {
}
