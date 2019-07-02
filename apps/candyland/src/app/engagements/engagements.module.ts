import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { CreateEngagementPopupComponent } from './containers/create-engagement-popup/create-engagement-popup.component';
import { EngagementsComponent } from './containers/engagements/engagements.component';
import { MatDialogModule, MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { EngagementTypeComponent } from './containers/create-engagement-popup/engagement-type/engagement-type.component';
import { TypeItemComponent } from './containers/create-engagement-popup/engagement-type/type-item/type-item.component';
import { InkModule } from '@cl-shared/components/ink/ink.module';
import { SurveyComponent } from './containers/create-engagement-popup/survey/survey.component';
import { GamesComponent } from './containers/create-engagement-popup/games/games.component';
import { StampComponent } from './containers/create-engagement-popup/stamp/stamp.component';
import { InstantRewardComponent } from './containers/create-engagement-popup/instant-reward/instant-reward.component';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { GameComponent } from './containers/create-engagement-popup/games/game/game.component';
import { ReactiveFormsModule } from '@angular/forms';

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
    GameComponent
  ],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    MatDialogModule,
    MatIconModule,
    InkModule,
    MatFormFieldModule,
    MatSelectModule,
    ButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule { }
