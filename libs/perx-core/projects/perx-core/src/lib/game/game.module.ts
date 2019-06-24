import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GameService } from './game.service';
import { EnvConfig } from './env-config';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    GameService
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
