import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { V4ProfileService } from './v4-profile.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MicroProfileComponent } from './micro-profile/micro-profile.component';
import { MatIconModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Config } from '../config/config';

export function profileServiceFactory(http: HttpClient, config: Config): ProfileService {
  // Make decision on what to instantiate base on config
  return new V4ProfileService(http, config);
}

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: ProfileService,
      useFactory: profileServiceFactory,
      deps: [HttpClient, Config]
    }
  ],
  declarations: [UserProfileComponent, MicroProfileComponent],
  exports: [UserProfileComponent, MicroProfileComponent]
})
export class ProfileModule {
}
