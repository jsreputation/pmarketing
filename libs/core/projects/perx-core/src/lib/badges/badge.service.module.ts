import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { IBadgeService } from '../badges/badge.service';
import { V4BadgeService } from '../badges/v4-badge.service';

export function badgeServiceFactory(
  // http: HttpClient,
  // configService: ConfigService
): IBadgeService {
  // return new V4BadgeService(http, configService);
  return new V4BadgeService();
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BadgeModule {
  public static forRoot(): ModuleWithProviders<BadgeModule> {
    return {
      ngModule: BadgeModule,
      providers: [
        {
          provide: IBadgeService,
          useFactory: badgeServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }

  public static forChild(): ModuleWithProviders<BadgeModule> {
    return {
      ngModule: BadgeModule
    };
  }
}
