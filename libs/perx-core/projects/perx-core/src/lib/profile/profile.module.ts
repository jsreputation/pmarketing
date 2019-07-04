import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class ProfileModule {
  public static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: ProfileModule,
      providers: [
        ProfileService,
        {
          provide: 'config',
          useValue: config
        }
      ],
    };
  }
}
