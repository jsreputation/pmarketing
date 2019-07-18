import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './game.service';
import { EnvConfig } from '../shared/env-config';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PinataComponent } from './pinata/pinata.component';

@NgModule({
  declarations: [
    ShakeTreeComponent,
    PinataComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    GameService
  ],
  exports: [
    ShakeTreeComponent,
    PinataComponent
  ]
})
export class GameModule {
  public static forRoot(config: EnvConfig): ModuleWithProviders {
    return {
      ngModule: GameModule,
      providers: [
        GameService,
        {
          provide: EnvConfig,
          useValue: config
        }
      ],
    };
  }
}
