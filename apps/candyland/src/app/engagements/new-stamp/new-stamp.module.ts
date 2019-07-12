import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewStampRoutingModule } from './new-stamp-routing.module';
import { NewStampComponent } from './containers/new-stamp/new-stamp.component';
import { NewStampSettingsPageComponent } from './containers/new-stamp-settings-page/new-stamp-settings-page.component';
import { NewStampRulesPageComponent } from './containers/new-stamp-rules-page/new-stamp-rules-page.component';
import { NewStampDisplayPageComponent } from './containers/new-stamp-display-page/new-stamp-display-page.component';
import { StampRulePopupComponent } from './containers/stamp-rule-popup/stamp-rule-popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { GameMobilePreviewStampModule } from '@cl-shared/components/game-mobile-preview-stamp/game-mobile-preview-stamp.module';

@NgModule({
  declarations: [
    NewStampComponent,
    NewStampSettingsPageComponent,
    NewStampRulesPageComponent,
    NewStampDisplayPageComponent,
    StampRulePopupComponent
  ],
  imports: [
    CommonModule,
    NewStampRoutingModule,
    ReactiveFormsModule,
    ImagesPreviewModule,
    ButtonModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    InfoHintModule,
    GameMobilePreviewStampModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  entryComponents: [
    StampRulePopupComponent
  ]
})
export class NewStampModule {
}
