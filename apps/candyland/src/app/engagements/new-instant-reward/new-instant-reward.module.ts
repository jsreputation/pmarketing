import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewInstantRewardRoutingModule } from './new-instant-reward-routing.module';
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

import {
  RewardsModule as PerxRewardsModule, ConfigModule,
} from '@perx/core';
import { environment } from '@cl-environments/environment';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { ConfirmModalModule } from '@cl-shared';
import { NewInstantRewardManagePageComponent } from './containers/new-instant-reward-manage-page/new-instant-reward-manage-page.component';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewInstantRewardManagePageComponent,
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    CommonModule,
    NewInstantRewardRoutingModule,
    ReactiveFormsModule,
    ImagesPreviewModule,
    ButtonModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    InfoHintModule,
    GameMobilePreviewModule,
    PerxRewardsModule,
    SimpleMobileViewModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ConfirmModalModule,
    DirectivesModule,
    TranslateModule,
  ]
})
export class NewInstantRewardModule {
}
