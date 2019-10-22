import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4GameService } from './v4-game.service';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PinataComponent } from './pinata/pinata.component';
import { Config } from '../config/config';
import { IGameService } from './igame.service';
import { WhistlerGameService } from './whist-game.service';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { ScratchCardComponent } from './scratch-card/scratch-card.component';

export function gameServiceFactory(http: HttpClient, config: Config, vouchSvc?: IVoucherService): IGameService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerGameService(http, config, vouchSvc);
  }
  return new V4GameService(http, config);
}

@NgModule({
  declarations: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: IGameService,
      useFactory: gameServiceFactory,
      deps: [HttpClient, Config, IVoucherService]
    }
  ],
  exports: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent
  ]
})
export class GameModule {
}
