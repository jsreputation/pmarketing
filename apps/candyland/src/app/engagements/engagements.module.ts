import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { EngagementsComponent } from './containers/engagements/engagements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { SearchFilterModule } from '@cl-shared/table/search-filter/search-filter.module';
import { TabsFilterModule } from '@cl-shared/table/tabs-filter/tabs-filter.module';
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule, MatFormFieldModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { InkModule } from '@cl-shared/components/ink/ink.module';
import { CreateEngagementPopupModule } from '../shared/containers/create-engagement-popup/create-engagement-popup.module';


@NgModule({
  declarations: [
    EngagementsListPageComponent,
    EngagementsComponent,
  ],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    StatusLabelModule,
    TableFiltersModule,
    SearchFilterModule,
    TabsFilterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    NoDataModule,
    InkModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    CreateEngagementPopupModule,
  ],
  entryComponents: [
    EngagementsListPageComponent,
  ]
})
export class EngagementsModule {
}
