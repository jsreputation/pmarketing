import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { ConfigService} from '../config/config.service';
import { IVoucherService } from '../vouchers/ivoucher.service';
import { ICampaignService } from '../campaign/icampaign.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { IGameService } from './igame.service';
import { WhistlerGameService } from './whist-game.service';
import { V4GameService } from './v4-game.service';
import { ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { GameModule } from './game.module';

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


// For the forRoot and forChild methods, although they are functions,
// it is highly recommended that they only have "return", without implementing more logic.
// for aot
@NgModule({
})
export class GameServiceModule {
  public static forRoot(): ModuleWithProviders<GameModule> {
    return {
      ngModule: GameServiceModule,
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
      ]
    };
  }
  public static forChild(): ModuleWithProviders<GameServiceModule> {
    return {
      ngModule: GameServiceModule
    };
  }
}
