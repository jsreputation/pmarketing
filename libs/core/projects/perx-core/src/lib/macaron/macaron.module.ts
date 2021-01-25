import {
  ModuleWithProviders,
  NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MacaronService } from './macaron.service';

@NgModule({
  declarations: [],
  imports: [ CommonModule ]
})

export class MacaronModule {
  public static forRoot(): ModuleWithProviders<MacaronModule> {
    return {
      ngModule: MacaronModule,
      providers: [
        MacaronService
      ]
    };
  }

  public static forChild(): ModuleWithProviders<MacaronModule> {
    return {
      ngModule: MacaronModule
    };
  }
}

