import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalModule } from '@cl-shared/containers/confirm-modal/confirm-modal.module';
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
import { EngagementItemModule } from '@cl-shared/components/engagement-item/engagement-item.module';
import { EngagementsListComponent } from './components/engagements-list/engagements-list.component';
import { EngagementsGridComponent } from './components/engagements-grid/engagements-grid.component';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoader } from '@cl-core/translate-services/multiple-translate-loader-service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    EngagementsListPageComponent,
    EngagementsComponent,
    EngagementsListComponent,
    EngagementsGridComponent,
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
    EngagementItemModule,
    ConfirmModalModule,
    DirectivesModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (httpClient) => translateLoader(httpClient, [
          { prefix: '/assets/i18n/campaigns/', suffix: '.json' },
          { prefix: '/assets/i18n/common/', suffix: '.json'}
        ]),
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  entryComponents: [
    EngagementsListPageComponent,
  ]
})
export class EngagementsModule {
}
