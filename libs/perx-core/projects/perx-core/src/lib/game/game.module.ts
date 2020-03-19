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
import { MineSweeperComponent } from './mine-sweeper/mine-sweeper.component';
import { ICampaignService } from '../campaign/icampaign.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { ConfigService } from '../config/config.service';

export function gameServiceFactory(
  http: HttpClient,
  config: Config,
  configService: ConfigService,
  vouchSvc: IVoucherService,
  campaignService?: ICampaignService,
  auth?: AuthenticationService
): IGameService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerGameService(http, config, vouchSvc, campaignService, auth);
  }
  return new V4GameService(http, configService);
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
    MineSweeperComponent,
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
        ConfigService,
        IVoucherService,
        [new Optional(), ICampaignService],
        [new Optional(), AuthenticationService]
      ]
    }
  ],
  exports: [
    ShakeTreeComponent,
    PinataComponent,
    ScratchCardComponent,
    SpinTheWheelComponent,
    SnakeGameComponent,
    MineSweeperComponent
  ]
})
export class GameModule {
}
