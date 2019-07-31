import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsListPageComponent } from './containers/campaigns-list-page/campaigns-list-page.component';
import { NewCampaignDetailPageComponent } from './containers/new-campaign-detail-page/new-campaign-detail-page.component';
import { NewAudiencePageComponent } from './containers/new-audience-page/new-audience-page.component';
import { NewChannelPageComponent } from './containers/new-channel-page/new-channel-page.component';
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
  MatSortModule,
  MatStepperModule,
  MatTableModule
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { RangeDatePickerFilterModule } from '@cl-shared/table/range-date-picker-filter/range-date-picker-filter.module';
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


@NgModule({
  declarations: [
    CampaignsListPageComponent,
    NewCampaignDetailPageComponent,
    NewAudiencePageComponent,
    NewChannelPageComponent,
    NewCampaignReviewPageComponent,
    NewCampaignDonePopupComponent,
    CampaignsComponent,
    NewCampaignComponent,
    NewCampaignRewardsPageComponent,
    NewCampaignSelectEngagementPageComponent,
    RewardItemComponent,
    RewardItemPreviewComponent
  ],
  imports: [
    CommonModule,
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
    CheckboxGroupModule
  ],
  entryComponents: [
    NewCampaignDonePopupComponent
  ]
})
export class CampaignsModule {
}
