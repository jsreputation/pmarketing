import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4GameService } from './v4-game.service';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PinataComponent } from './pinata/pinata.component';
import { Config } from '../config/config';
import { IGameService } from './igame.service';

export function gameServiceFactory(http: HttpClient, config: Config): IGameService {
  // Make decision on what to instantiate base on config
  return new V4GameService(http, config);
}

@NgModule({
  declarations: [
    ShakeTreeComponent,
    PinataComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: IGameService,
      useFactory: gameServiceFactory,
      deps: [HttpClient, Config]
    }
  ],
  exports: [
    ShakeTreeComponent,
    PinataComponent
  ]
})
export class GameModule {
}
