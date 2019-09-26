import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesRoutingModule } from './games-routing.module';
import { NewShakePageComponent } from './containers/new-shake-page/new-shake-page.component';
import { NewPinataPageComponent } from './containers/new-pinata-page/new-pinata-page.component';
import { GameComponent } from './containers/game/game.component';
import { CreateShakeTreeComponent } from './components/create-shake-tree/create-shake-tree.component';
import {
  MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule, MatTabsModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagesPreviewModule } from '@cl-shared/components/images-preview/images-preview.module';
import { SelectGraphicModule } from '@cl-shared/components/select-graphic/select-graphic.module';
import { SelectGraphicWrapModule } from '@cl-shared/components/select-graphic-wrap/select-graphic-wrap.module';
import { GameModule, ConfigModule } from '@perx/core';
import { environment } from '@cl-environments/environment';
import { SimpleMobileViewModule } from '@cl-shared/components/simple-mobile-view/simple-mobile-view.module';

@NgModule({
  declarations: [
    NewShakePageComponent,
    NewPinataPageComponent,
    GameComponent,
    CreateShakeTreeComponent,
  ],
  imports: [
    ConfigModule.forRoot({...environment}),
    CommonModule,
    ReactiveFormsModule,
    GamesRoutingModule,
    ImagesPreviewModule,
    ButtonModule,
    SelectGraphicModule,
    SelectGraphicWrapModule,
    GameModule,
    SimpleMobileViewModule,

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
