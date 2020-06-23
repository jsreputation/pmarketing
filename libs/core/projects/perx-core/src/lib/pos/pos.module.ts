import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HttpBackend,
  // HttpClient
} from '@angular/common/http';
// import { Config } from '../config/config';
import { ConfigService } from '../config/config.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { PosService } from './pos.service';
import { V4PosService } from './v4-pos.service';
import { ProfileService } from '../profile/profile.service';

// export function posServiceFactory(
// http: HttpClient,
// config: Config,
// configService:
// ConfigService,
// authService: AuthenticationService,
// profileService: ProfileService): PosService {
export function posServiceFactory(
  http: HttpBackend,
  configService: ConfigService,
  authService: AuthenticationService,
  profileService: ProfileService): PosService {
  // Make decision on what to instantiate base on config
  // if (config.isWhistler) {
  //   return new WhistlerPosService(http, config);
  // }
  return new V4PosService(http, configService, authService, profileService);
}

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  providers: [
    {
      provide: PosService,
      useFactory: posServiceFactory,
      deps: [ HttpBackend, ConfigService, AuthenticationService, ProfileService ]
    }
  ]
})

export class PosModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: PosModule,
      // providers: [
      //   {
      //     provide: Config,
      //     useValue: config
      //   }
      // ],
    };
  }

  public static forChild(): ModuleWithProviders<PosModule> {
    return {
      ngModule: PosModule
    };
  }
}

