import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectRewardPopupModule } from '@cl-shared/containers/select-reward-popup/select-reward-popup.module';
import { PaginationModule } from '@cl-shared/table/paginator/paginator.module';
import { CampaignsListComponent } from 'src/app/campaigns/components/campaigns-list/campaigns-list.component';
import { NewCampaignRewardsStampsFormService } from 'src/app/campaigns/services/new-campaign-rewards-stamps-form.service';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsListPageComponent } from './containers/campaigns-list-page/campaigns-list-page.component';
import { NewCampaignDetailPageComponent } from './containers/new-campaign-detail-page/new-campaign-detail-page.component';
import { NewCampaignReviewPageComponent } from './containers/new-campaign-review-page/new-campaign-review-page.component';
import { NewCampaignDonePopupComponent } from './containers/new-campaign-done-popup/new-campaign-done-popup.component';
import { CampaignsComponent } from './containers/campaigns/campaigns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatStepperModule,
  MatTableModule,
  MatSnackBarModule
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { RangeDatePickerFilterModule } from '@cl-shared/components/range-date-picker-filter/range-date-picker-filter.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import {
  SeparateRangeDatePickerFilterModule
} from '@cl-shared/table/separate-range-date-picker-filter/separate-range-date-picker-filter.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { NewCampaignComponent } from './containers/new-campaign/new-campaign.component';
import { NewCampaignRewardsPageComponent } from './containers/new-campaign-rewards-page/new-campaign-rewards-page.component';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
import { ItemListModule } from '@cl-shared/components/item-list/item-list.module';
import { RewardItemComponent } from './components/reward-item/reward-item.component';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';
import { DateTimePickerModule } from '@cl-shared/components/date-time-picker/date-time-picker.module';
import { TimePickerModule } from '@cl-shared/components/time-picker/time-picker.module';
import { DatePickerModule } from '@cl-shared/components/date-picker/date-picker.module';
import { RewardItemPreviewComponent } from './components/reward-item-preview/reward-item-preview.component';
import { SmsEditorModule } from '@cl-shared/components/sms-editor/sms-editor.module';
import { CopyLinkModule } from '@cl-shared/components/copy-link/copy-link.module';
import { DownloadLinkModule } from '@cl-shared/components/download-link/download-link.module';
import { UploadFileModule } from '@cl-shared/components/upload-file/upload-file.module';
import {
  NewCampaignSelectEngagementPageComponent
} from './containers/new-campaign-select-engagement-page/new-campaign-select-engagement-page.component';
import { ChipListModule } from '@cl-shared/components/chip-list/chip-list.module';
import { CheckboxGroupModule } from '@cl-shared/components/checkbox-group/checkbox-group.module';
import { NewCampaignDetailFormService } from 'src/app/campaigns/services/new-campaign-detail-form.service';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';
import {
  NewCampaignRewardsStampsPageComponent
} from 'src/app/campaigns/containers/new-campaign-rewards-stamps-page/new-campaign-rewards-stamps-page.component';
import {
  NewCampaignRewardsFormGroupComponent
} from './components/new-campaign-rewards-form-group/new-campaign-rewards-form-group.component';
import {
  NewCampaignStampRuleFormGroupComponent
} from './components/new-campaign-stamp-rule-form-group/new-campaign-stamp-rule-form-group.component';
import { ReviewCampaignComponent } from './containers/review-campaign/review-campaign.component';
import { CreateEngagementPopupModule } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.module';
import { NewCampaignRewardsSurveyPageComponent } from './containers/new-campaign-rewards-survey-page/new-campaign-rewards-survey-page.component';
import { SimpleMobileViewModule, PipesModule } from '@cl-shared';
import { SurveyModule as PerxSurveyModule, GameModule, ConfigModule, PuzzlesModule, RewardsModule as PerxRewardsModule } from '@perx/core';
import { environment } from '@cl-environments/environment';
import { CampaignsMobilePreviewComponent } from './components/campaigns-mobile-preview/campaigns-mobile-preview.component';
import { NewCampaignNotificationsComponent } from './containers/new-campaign-notifications/new-campaign-notifications.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { SubMenuItemComponent } from './components/sub-menu/sub-menu-item/sub-menu-item.component';
import { CampaignChannelsFormService } from './services/campaign-channels-form.service';
import { CampaignLaunchMessageComponent } from './components/campaign-launch-message/campaign-launch-message.component';
import { CampaignNotCompletedFormGroupComponent } from './components/campaign-not-completed-form-group/campaign-not-completed-form-group.component';
import { BeforeCampaignEndsFormGroupComponent } from './components/before-campaign-ends-form-group/before-campaign-ends-form-group.component';
import { BeforeRewardExpiresFormGroupComponent } from './components/before-reward-expires-form-group/before-reward-expires-form-group.component';
import { NoStampsToNextRewardFormGroupComponent } from './components/no-stamps-to-next-reward-form-group/no-stamps-to-next-reward-form-group.component';
import { EarnedStampFormGroupComponent } from './components/earned-stamp-form-group/earned-stamp-form-group.component';
import { EarnedRewardFormGroupComponent } from './components/earned-reward-form-group/earned-reward-form-group.component';

@NgModule({
  providers: [
    CampaignCreationStoreService,
    StepConditionService,
    NewCampaignDetailFormService,
    NewCampaignRewardsStampsFormService,
    CampaignChannelsFormService,
  ],
  declarations: [
    CampaignsListComponent,
    CampaignsListPageComponent,
    NewCampaignDetailPageComponent,
    NewCampaignReviewPageComponent,
    NewCampaignDonePopupComponent,
    CampaignsComponent,
    NewCampaignComponent,
    NewCampaignRewardsPageComponent,
    NewCampaignRewardsStampsPageComponent,
    NewCampaignSelectEngagementPageComponent,
    RewardItemComponent,
    RewardItemPreviewComponent,
    NewCampaignRewardsFormGroupComponent,
    NewCampaignStampRuleFormGroupComponent,
    ReviewCampaignComponent,
    NewCampaignRewardsSurveyPageComponent,
    CampaignsMobilePreviewComponent,
    NewCampaignNotificationsComponent,
    SubMenuComponent,
    SubMenuItemComponent,
    CampaignLaunchMessageComponent,
    CampaignNotCompletedFormGroupComponent,
    BeforeCampaignEndsFormGroupComponent,
    BeforeRewardExpiresFormGroupComponent,
    NoStampsToNextRewardFormGroupComponent,
    EarnedStampFormGroupComponent,
    EarnedRewardFormGroupComponent,
  ],
  imports: [
    CommonModule,
    CreateEngagementPopupModule,
    CampaignsRoutingModule,
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
    MatSnackBarModule,
    MatSelectModule,
    MatStepperModule,
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    TabsFilterModule,
    RangeDatePickerFilterModule,
    ButtonModule,
    SeparateRangeDatePickerFilterModule,
    NoDataModule,
    EngagementItemModule,
    ItemListModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    ProgressBarModule,
    DateTimePickerModule,
    TimePickerModule,
    DatePickerModule,
    SmsEditorModule,
    CopyLinkModule,
    DownloadLinkModule,
    UploadFileModule,
    ChipListModule,
    CheckboxGroupModule,
    SelectRewardPopupModule,
    MatSlideToggleModule,
    PaginationModule,
    PipesModule,
    SimpleMobileViewModule,
    PerxSurveyModule,
    ConfigModule.forRoot({ ...environment }),
    GameModule,
    PuzzlesModule,
    PerxRewardsModule,
  ],
  entryComponents: [
    NewCampaignDonePopupComponent
  ]
})
export class CampaignsModule {
}
