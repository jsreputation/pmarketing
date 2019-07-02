import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CampaignsRoutingModule} from './campaigns-routing.module';
import {CampaignsListPageComponent} from './containers/campaigns-list-page/campaigns-list-page.component';
import {NewInfoPageComponent} from './containers/new-info-page/new-info-page.component';
import {NewAudiencePageComponent} from './containers/new-audience-page/new-audience-page.component';
import {NewChannelPageComponent} from './containers/new-channel-page/new-channel-page.component';
import {NewReviewPageComponent} from './containers/new-review-page/new-review-page.component';
import {NewCampaignDonePopupComponent} from './containers/new-campaign-done-popup/new-campaign-done-popup.component';
import {CampaignsComponent} from './containers/campaigns/campaigns.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatIconModule, MatMenuModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatSortModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule} from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import { RangeDatePickerFilterModule } from '@cl-shared/table/range-date-picker-filter/range-date-picker-filter.module';

@NgModule({
  declarations: [
    CampaignsListPageComponent,
    NewInfoPageComponent,
    NewAudiencePageComponent,
    NewChannelPageComponent,
    NewReviewPageComponent,
    NewCampaignDonePopupComponent,
    CampaignsComponent
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
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    TabsFilterModule,
    RangeDatePickerFilterModule,
  ],
  entryComponents: [
    NewCampaignDonePopupComponent
  ]
})
export class CampaignsModule {
}
