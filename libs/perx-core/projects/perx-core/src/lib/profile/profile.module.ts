import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { V4ProfileService } from './v4-profile.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { ProfileSummaryComponent } from './profile-summary/profile-summary.component';
import {MatCardModule, MatIconModule} from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerProfileService } from './whistler-profile.service';
import { TokenStorage } from '../utils/storage/token-storage.service';
import { ConfigService } from '../config/config.service';

export function profileServiceFactory(
  http: HttpClient,
  config: Config,
  configService: ConfigService,
  tokenStorage: TokenStorage): ProfileService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerProfileService(http, config, tokenStorage);
  }
  return new V4ProfileService(http, configService);
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    {
      provide: ProfileService,
      useFactory: profileServiceFactory,
      deps: [HttpClient, Config, ConfigService, TokenStorage]
    }
  ],
  declarations: [UserProfileComponent, MicroProfileComponent, ProfileSummaryComponent],
  exports: [UserProfileComponent, MicroProfileComponent, ProfileSummaryComponent]
})
export class ProfileModule {
}
