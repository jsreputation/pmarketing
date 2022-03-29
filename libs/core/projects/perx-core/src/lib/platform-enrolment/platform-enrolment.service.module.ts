import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { PlatformEnrolmentService } from './platform-enrolment.service';
import { V4PlatformEnrolmentService } from './v4-platform-enrolment.service';
import { CommonModule } from '@angular/common';

export function platformEnrolmentServiceFactory(
  http: HttpClient,
  configService: ConfigService
): PlatformEnrolmentService {
  // Make decision on what to instantiate base on config
  return new V4PlatformEnrolmentService(http, configService);
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class PlatformEnrolmentServiceModule {
  public static forRoot(): ModuleWithProviders<PlatformEnrolmentServiceModule> {
    return {
      ngModule: PlatformEnrolmentServiceModule,
      providers: [
        {
          provide: PlatformEnrolmentService,
          useFactory: platformEnrolmentServiceFactory,
          deps: [HttpClient, ConfigService],
        },
      ],
    };
  }
  public static forChild(): ModuleWithProviders<PlatformEnrolmentServiceModule> {
    return {
      ngModule: PlatformEnrolmentServiceModule,
    };
  }
}
