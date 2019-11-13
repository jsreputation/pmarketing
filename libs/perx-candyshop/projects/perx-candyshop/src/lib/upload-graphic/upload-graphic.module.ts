import { Injectable, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadGraphicComponent } from './upload-graphic.component';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { IUploadFileService } from '../../models/upload-service.interface';
import { Observable, of } from 'rxjs';
import { IUploadedFile } from '../../models/uploaded-file.interface';

@Injectable({})
export class UploadFileService implements IUploadFileService {
  public upload(): Observable<IUploadedFile | string | null> {
    return of(null);
  }
}

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
    TranslateModule
  ]
})
export class UploadGraphicModule {
  public static forRoot(uploadFileService: IUploadFileService): ModuleWithProviders {
    return {
      ngModule: UploadGraphicModule,
      providers: [
        {
          provide: UploadFileService,
          useValue: uploadFileService
        }
      ],
    };
  }
}
