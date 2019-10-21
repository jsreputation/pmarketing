import {NgModule, ModuleWithProviders} from '@angular/core';
import {Config} from './config';
import {ConfigService} from './config.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [ConfigService]
})
export class ConfigModule {
  public static forRoot(config: Config): ModuleWithProviders {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: Config,
          useValue: config
        }
      ],
    };
  }
}
