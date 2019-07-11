import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewInstantRewardRoutingModule } from './new-instant-reward-routing.module';
import { NewInstantRewardComponent } from './containers/new-instant-reward/new-instant-reward.component';
import {
  NewInstantRewardAppearancePageComponent
} from './containers/new-instant-reward-appearance-page/new-instant-reward-appearance-page.component';
import {
  NewInstantRewardRewardsPageComponent
} from './containers/new-instant-reward-rewards-page/new-instant-reward-rewards-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule, MatRadioModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { GameMobilePreviewModule } from '@cl-shared/components/game-mobile-preview/game-mobile-preview.module';

@NgModule({
  declarations: [
    NewInstantRewardComponent,
    NewInstantRewardAppearancePageComponent,
    NewInstantRewardRewardsPageComponent
  ],
  imports: [
    CommonModule,
    NewInstantRewardRoutingModule,
    ReactiveFormsModule,
    ImagesPreviewModule,
    ButtonModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    InfoHintModule,
    GameMobilePreviewModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ]
})
export class NewInstantRewardModule {
}
