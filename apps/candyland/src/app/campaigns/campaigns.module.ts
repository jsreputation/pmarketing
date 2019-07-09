import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsListPageComponent } from './containers/campaigns-list-page/campaigns-list-page.component';
import { NewCampaignDetailPageComponent } from './containers/new-info-page/new-campaign-detail-page.component';
import { NewAudiencePageComponent } from './containers/new-audience-page/new-audience-page.component';
import { NewChannelPageComponent } from './containers/new-channel-page/new-channel-page.component';
import { NewCampaignReviewPageComponent } from './containers/new-campaign-review-page/new-campaign-review-page.component';
import { NewCampaignDonePopupComponent } from './containers/new-campaign-done-popup/new-campaign-done-popup.component';
import { CampaignsComponent } from './containers/campaigns/campaigns.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatStepperModule,
  MatRadioModule, MatCardModule, MatCheckboxModule
} from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
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
import { NewCampaignSelectTemplatePageComponent } from './containers/new-campaign-select-template-page/new-campaign-select-template-page.component';
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
import { ItemListModule } from '@cl-shared/components/item-list/item-list.module';
import { RewardItemComponent } from './components/reward-item/reward-item.component';
import { ProgressBarModule } from '@cl-shared/components/progress-bar/progress-bar.module';


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
    NewCampaignSelectTemplatePageComponent,
    RewardItemComponent
  ],
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
    ProgressBarModule
  ],
  entryComponents: [
    NewCampaignDonePopupComponent
  ]
})
export class CampaignsModule {
}
