import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGraphicComponent } from './upload-graphic.component';
import { MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { IUploadGraphicConfig } from './upload-graphic-config.interface';
import { UploadImageService } from './upload-image.service';

const uploadImageUrl = new InjectionToken<string>('uploadImageUrl');

@NgModule({
  declarations: [
    UploadGraphicComponent
  ],
  exports: [
    UploadGraphicComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class UploadGraphicModule {
  public static forRoot(config: IUploadGraphicConfig = {}): ModuleWithProviders {
    return {
      ngModule: UploadGraphicModule,
      providers: [
        {
          provide: uploadImageUrl,
          useValue: config.url || 'https://api-dev1.uat.whistler.perxtech.io/storage/images'
        },
        {
          provide: UploadImageService,
          useValue: config.service || UploadImageService
        }
      ]
    };
  }
}
