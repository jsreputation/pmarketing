import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';
import { V4ProfileService } from './v4-profile.service';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class ProfileModule {
  public static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: ProfileModule,
      providers: [
        {
          provide: ProfileService,
          useClass: V4ProfileService
        },
        {
          provide: 'config',
          useValue: config
        }
      ],
    };
  }
}
