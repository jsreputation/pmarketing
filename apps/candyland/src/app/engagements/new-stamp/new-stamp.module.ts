import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewStampRoutingModule } from './new-stamp-routing.module';
import { NewStampComponent } from './containers/new-stamp/new-stamp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatTabsModule } from '@angular/material';
import { InfoHintModule } from '@cl-shared/components/info-hint/info-hint.module';
import { GameMobilePreviewStampModule } from '@cl-shared/components/game-mobile-preview-stamp/game-mobile-preview-stamp.module';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { PuzzlesModule } from '@perx/core';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxGroupModule } from '@cl-shared/components/checkbox-group/checkbox-group.module';

@NgModule({
  declarations: [
    NewStampComponent,
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
    SimpleMobileViewModule,
    PuzzlesModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    DirectivesModule,
    CheckboxGroupModule
  ]
})
export class NewStampModule {
}
