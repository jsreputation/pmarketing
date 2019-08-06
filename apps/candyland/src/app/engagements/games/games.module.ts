import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { NewShakePageComponent } from './containers/new-shake-page/new-shake-page.component';
import { NewShakeSettingsPageComponent } from './containers/new-shake-settings-page/new-shake-settings-page.component';
import { NewTapPageComponent } from './containers/new-tap-page/new-tap-page.component';
import { NewTapDisplayPageComponent } from './containers/new-tap-display-page/new-tap-display-page.component';
import { NewTapSettingsPageComponent } from './containers/new-tap-settings-page/new-tap-settings-page.component';
import { NewPinataPageComponent } from './containers/new-pinata-page/new-pinata-page.component';
import { GameComponent } from './containers/game/game.component';
import { CreateShakeTreeComponent } from './components/create-shake-tree/create-shake-tree.component';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule, MatSliderModule,
  MatTabsModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { GameModule } from '@perx/core';

@NgModule({
  declarations: [
    NewShakePageComponent,
    NewShakeSettingsPageComponent,
    NewTapPageComponent,
    NewTapDisplayPageComponent,
    NewTapSettingsPageComponent,
    NewPinataPageComponent,
    GameComponent,
    CreateShakeTreeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GamesRoutingModule,
    ImagesPreviewModule,
    ButtonModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    GameModule,

    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,

  ]
})
export class GamesModule {
}
