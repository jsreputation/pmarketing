import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadFileComponent } from './upload-file.component';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { DownloadButtonModule } from '../download-button/download-button.module';
import { UploadFileService } from './upload-file-service.interface';
import { DefaultUploadFileService } from './default-upload-file.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';

export const UPLOAD_FILE_URL = new InjectionToken<string>('UPLOAD_FILE_URL');

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  exports: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    DownloadButtonModule,
  ]
})

export class UploadFileModule {
  public static forRoot(url: string | null = null): ModuleWithProviders {
    console.log('init UploadFileModule');
    return {
      ngModule: UploadFileModule,
      providers: [
        {
          provide: UPLOAD_FILE_URL,
          useValue: url,
        },
        {
          provide: UploadFileService,
          useClass: DefaultUploadFileService,
          deps: [UPLOAD_FILE_URL]
        }
      ]
    };
  }
}
