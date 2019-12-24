import { IAdvancedUploadFileService, IUploadFileStatus, UploadStatus } from './iadvanced-upload-file.service';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadFileService } from '@cl-core-services';
import { VouchersService } from './vouchers.service';
import {map, switchMap, retryWhen, mergeMap, delay, finalize, publishReplay, refCount} from 'rxjs/operators';
import { IWVouchersApi, WStatus, IJsonApiItemPayload } from '@perx/whistler';

@Injectable()
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
    console.log('vouchers service options', options);
    const maxRetryTimes = 60;
    const delayUnitTime = 1000;
    let retryTimes = 0;
    const uploadSvc$ = this.uploadService.uploadFile(file)
      .pipe(
        map((res: IUploadedFile) => res.url),
        switchMap((url: string) => this.vouchersService.uploadVouchers(url, options.rewardId)),
        switchMap(
          (batch: IJsonApiItemPayload<IWVouchersApi>) =>
            this.vouchersService.getVouchersBatch(Number.parseInt(batch.data.id, 10)).pipe(
              switchMap((res: IJsonApiItemPayload<IWVouchersApi>) => {
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
        (res: IJsonApiItemPayload<IWVouchersApi>) => {
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
    return subject.pipe(
      finalize(() => {
        uploadSvc$.unsubscribe();
      }),
      publishReplay(1), // https://itnext.io/the-magic-of-rxjs-sharing-operators-and-their-differences-3a03d699d255
      refCount() // https://github.com/ReactiveX/rxjs/issues/3786
    );
  }
}
