import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { V4QuestService } from './v4-quest.service';
import { IQuestService } from './quest.service';
import { ConfigService } from '../config/config.service';

export function questServiceFactory(http: HttpClient, configService: ConfigService): IQuestService {
  return new V4QuestService(http, configService);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class QuestModule {
  public static forRoot(): ModuleWithProviders<QuestModule> {
    return {
      ngModule: QuestModule,
      providers: [
        {
          provide: IQuestService,
          useFactory: questServiceFactory,
          deps: [HttpClient, ConfigService]
        }
      ]
    };
  }
  public static forChild(): ModuleWithProviders<QuestModule> {
    return {
      ngModule: QuestModule
    };
  }
}
