import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusLabelComponent } from './status-label.component';
import { IStatusLabelConfig } from './status-label.interface';

const statusLabelConfig = new InjectionToken<string>('statusLabelConfig');

@NgModule({
  declarations: [
    StatusLabelComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    StatusLabelComponent
  ]
})
export class StatusLabelModule {
  public static forRoot(config: IStatusLabelConfig = {}): ModuleWithProviders {
    return {
      ngModule: StatusLabelModule,
      providers: [
        {
          provide: statusLabelConfig,
          useValue: config
        }
      ]
    };
  }
}
