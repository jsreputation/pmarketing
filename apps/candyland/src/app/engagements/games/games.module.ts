import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSliderModule,
  MatTabsModule,
} from '@angular/material';

import { environment } from '@cl-environments/environment';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';
import { DirectivesModule } from '@cl-shared/directives/directives.module';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import {
  GameModule,
  ConfigModule,
} from '@perx/core';

import { GamesRoutingModule } from './games-routing.module';
import { NewShakePageComponent } from './containers/new-shake-page/new-shake-page.component';
import { NewPinataPageComponent } from './containers/new-pinata-page/new-pinata-page.component';
import { NewScratchPageComponent } from './containers/new-scratch-page/new-scratch-page.component';
import { GameComponent } from './containers/game/game.component';

import { SettingsMobilePreviewModule } from '../../settings/components/settings-mobile-preview/settings-mobile-preview.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewShakePageComponent,
    NewPinataPageComponent,
    NewScratchPageComponent,
    GameComponent,
  ],
  imports: [
    ConfigModule.forRoot({ ...environment }),
    CommonModule,
    ReactiveFormsModule,
    GamesRoutingModule,
    ImagesPreviewModule,
    ButtonModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    GameModule,
    SimpleMobileViewModule,
    SettingsMobilePreviewModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    DirectivesModule,
    TranslateModule,
  ]
})
export class GamesModule {
}
