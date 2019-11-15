import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DownloadButtonModule } from '../download-button/download-button.module';
import { IUploadFileConfig } from './upload-file-config.interface';
import { UploadFileService } from './upload-file.service';

const uploadFileUrl = new InjectionToken<string>('uploadFileUrl');

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  exports: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    DownloadButtonModule,
  ]
})
export class UploadFileModule {
  public static forRoot(config: IUploadFileConfig): ModuleWithProviders {
    return {
      ngModule: UploadFileModule,
      providers: [
        {
          provide: uploadFileUrl,
          useValue: config.url || 'https://api-dev1.uat.whistler.perxtech.io/storage/documents'
        },
        {
          provide: UploadFileService,
          useValue: config.service || UploadFileService
        }
      ]
    };
  }
}
