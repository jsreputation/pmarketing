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
  MatButtonModule, MatFormFieldModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';
import { InkModule } from '@cl-shared/components/ink/ink.module';
import { EngagementTypeComponent } from './containers/create-engagement-popup/engagement-type/engagement-type.component';
import { SurveyComponent } from './containers/create-engagement-popup/survey/survey.component';
import { TypeItemComponent } from './containers/create-engagement-popup/engagement-type/type-item/type-item.component';
import { GamesComponent } from './containers/create-engagement-popup/games/games.component';
import { GameComponent } from './containers/create-engagement-popup/games/game/game.component';
import { InstantRewardComponent } from './containers/create-engagement-popup/instant-reward/instant-reward.component';
import { StampComponent } from './containers/create-engagement-popup/stamp/stamp.component';

@NgModule({
  declarations: [
    EngagementsListPageComponent,
    CreateEngagementPopupComponent,
    EngagementsComponent,
    EngagementTypeComponent,
    TypeItemComponent,
    SurveyComponent,
    GamesComponent,
    StampComponent,
    InstantRewardComponent,
    GameComponent,
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
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    ButtonModule,
    NoDataModule,
    InkModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
  ],
  entryComponents: [
    EngagementsListPageComponent,
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule {
}
