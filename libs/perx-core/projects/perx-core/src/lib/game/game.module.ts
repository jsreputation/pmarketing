import { NgModule, Optional } from '@angular/core';
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
import { SpinTheWheelComponent } from './spin-the-wheel/spin-the-wheel.component';
import { SnakeGameComponent } from './snake/snake.component';
import { ICampaignService } from '../campaign/icampaign.service';

export function gameServiceFactory(
  http: HttpClient,
  config: Config,
  vouchSvc: IVoucherService,
  campaignService?: ICampaignService
): IGameService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerGameService(http, config, vouchSvc, campaignService);
  }
  return new V4GameService(http, config);
}
// https://github.com/ng-packagr/ng-packagr/issues/641
// @dynamic
@NgModule({
  declarations: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent,
    SpinTheWheelComponent,
    SnakeGameComponent,
  ],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: IGameService,
      useFactory: gameServiceFactory,
      deps: [
        HttpClient,
        Config,
        IVoucherService,
        [new Optional(), ICampaignService]
      ]
    }
  ],
  exports: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent,
    SpinTheWheelComponent,
    SnakeGameComponent
  ]
})
export class GameModule {
}
