import { CreateEngagementPopupComponent } from './create-engagement-popup.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatRadioModule, MatSelectModule
} from '@angular/material';
import { EngagementTypeComponent } from './engagement-type/engagement-type.component';
import { TypeItemComponent } from './engagement-type/type-item/type-item.component';
import { SurveyComponent } from './survey/survey.component';
import { GamesComponent } from './games/games.component';
import { StampComponent } from './stamp/stamp.component';
import { InstantRewardComponent } from './instant-reward/instant-reward.component';
import { GameComponent } from './games/game/game.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InkModule } from '@cl-shared/components/ink/ink.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule } from '@cl-shared/table/no-data/no-data.module';

@NgModule({
  declarations: [
    CreateEngagementPopupComponent,
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
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,
    InkModule,
    MatFormFieldModule,
    ButtonModule,
    NoDataModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    CreateEngagementPopupComponent,
  ],
  entryComponents: [
    CreateEngagementPopupComponent
  ]
})
export class CreateEngagementPopupModule {
}
