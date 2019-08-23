import { NgModule, ModuleWithProviders } from '@angular/core';
import { Config } from './config';

@NgModule({
  declarations: [],
  imports: [
  ]
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
