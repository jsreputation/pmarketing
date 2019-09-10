import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GameService } from './game.service';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PinataComponent } from './pinata/pinata.component';
import { Config } from 'perx-core/perx-core';

export function gameServiceFactory(http: HttpClient, config: Config): GameService {
  // Make decision on what to instantiate base on config
  return new GameService(http, config);
}

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
    {
      provide: GameService,
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
