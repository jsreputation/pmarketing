import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { V4ProfileService } from './v4-profile.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { MatIconModule } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { WhistlerProfileService } from './whistler-profile.service';
import { TokenStorage } from '../auth/authentication/token-storage.service';

export function profileServiceFactory(http: HttpClient, config: Config, tokenStorage: TokenStorage): ProfileService {
  // Make decision on what to instantiate base on config
  if (config.isWhistler) {
    return new WhistlerProfileService(http, config, tokenStorage);
  }
  return new V4ProfileService(http, config);
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: ProfileService,
      useFactory: profileServiceFactory,
      deps: [HttpClient, Config, TokenStorage]
    }
  ],
  declarations: [UserProfileComponent, MicroProfileComponent],
  exports: [UserProfileComponent, MicroProfileComponent]
})
export class ProfileModule {
}
