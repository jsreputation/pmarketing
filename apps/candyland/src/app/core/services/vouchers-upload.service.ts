import { IAdvancedUploadFileService, IUploadFileStatus, UploadStatus } from './iadvanced-upload-file.service';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadFileService } from '@cl-core-services';
import { VouchersService } from './vouchers.service';
import { map, switchMap, retryWhen, mergeMap, delay } from 'rxjs/operators';
import { IWVouchersApi, WStatus } from '@perx/whistler';

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
    let maxRetryTimes = 5;
    let delayUnitTime = 1000;
    let retryTimes = 0;
    this.uploadService.uploadFile(file)
      .pipe(
        map((res: IUploadedFile) => res.url),
        switchMap((url: string) => this.vouchersService.uploadVouchers(url, options.rewardId)),
        switchMap(
          (batch: IJsonApiPayload<IWVouchersApi>) =>
            this.vouchersService.getVouchersBatch(Number.parseInt(batch.data.id)).pipe(
              switchMap((res: IJsonApiPayload<IWVouchersApi>) => {
                if (res.data.attributes.status !== WStatus.success) {
                  throw of(new Error('codes are not ready'));
                }
                return of(res);
              }),
              retryWhen(
                (err: Observable<Error>) => err.pipe(
                  mergeMap(error => {
                    if (retryTimes < maxRetryTimes) {
                      retryTimes++;
                      return of(error).pipe(delay(delayUnitTime));
                    }
                    return throwError(error);
                  })
                )
              )
            )
        )
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
