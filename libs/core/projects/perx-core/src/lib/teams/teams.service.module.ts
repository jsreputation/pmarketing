import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { TeamsService } from './teams.service';
import { V4TeamsService } from './v4-teams.service';

export function teamsServiceFactory(http: HttpClient, configService: ConfigService): TeamsService {
  return new V4TeamsService(http, configService);
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class TeamsServiceModule {
  public static forRoot(): ModuleWithProviders<TeamsServiceModule> {
    return {
      ngModule: TeamsServiceModule,
      providers: [
        {
          provide: TeamsService,
          useFactory: teamsServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<TeamsServiceModule> {
    return {
      ngModule: TeamsServiceModule
    };
  }
}
