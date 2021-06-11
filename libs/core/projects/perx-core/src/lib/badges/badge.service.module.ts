import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { BadgeService } from '../badges/badge.service';
import { V4BadgeService } from '../badges/v4-badge.service';

export function badgeServiceFactory(http: HttpClient, configService: ConfigService): BadgeService {
  return new V4BadgeService(http, configService);
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BadgeServiceModule {
  public static forRoot(): ModuleWithProviders<BadgeServiceModule> {
    return {
      ngModule: BadgeServiceModule,
      providers: [
        {
          provide: BadgeService,
          useFactory: badgeServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }

  public static forChild(): ModuleWithProviders<BadgeServiceModule> {
    return {
      ngModule: BadgeServiceModule
    };
  }
}
