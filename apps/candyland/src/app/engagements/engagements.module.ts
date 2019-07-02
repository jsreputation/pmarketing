import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { CreateEngagementPopupComponent } from './containers/create-engagement-popup/create-engagement-popup.component';
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
  MatDialogModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [EngagementsListPageComponent, CreateEngagementPopupComponent, EngagementsComponent],
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
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  entryComponents: [
    EngagementsListPageComponent,
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule {
}
