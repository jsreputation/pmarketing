import { IAdvancedUploadFileService, IUploadFileStatus, UploadStatus } from './iadvanced-upload-file.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadFileService } from '@cl-core-services';
import { VouchersService } from './vouchers.service';
import { map, switchMap } from 'rxjs/operators';
import { IWVouchersApi } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class VouchersUploadService extends IAdvancedUploadFileService {
  constructor(
    private uploadService: UploadFileService,
    private vouchersService: VouchersService,
  ) {
    super();
  }

  // constructor
  public uploadFile(file: File, options: any): Observable<IUploadFileStatus> {
    const subject: BehaviorSubject<IUploadFileStatus> = new BehaviorSubject<IUploadFileStatus>(
      { fileName: file.name, status: UploadStatus.UPLOADING }
    );
    this.uploadService.uploadFile(file)
      .pipe(
        map((res: IUploadedFile) => res.url),
        switchMap((url: string) => this.vouchersService.uploadVouchers(url, options.rewardId)),
        // handle polling
        // retryWhen()
      )
      .subscribe(
        (res: IJsonApiPayload<IWVouchersApi>) => {
          subject.next({
            fileName: file.name,
            status: UploadStatus.COMPLETED,
            nbRecords: res.data.attributes.amount || null
          });
        },
        () => {
          subject.next({
            fileName: file.name,
            status: UploadStatus.ERROR,
            errorMsg: 'Upload failed'
          });
        },
        () => { subject.complete(); }
      );
    return subject;
  }
}
