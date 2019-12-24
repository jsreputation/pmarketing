import { IAdvancedUploadFileService, IUploadFileStatus, UploadStatus } from './iadvanced-upload-file.service';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadFileService } from '@cl-core-services';
import {switchMap, retryWhen, mergeMap, delay, publishReplay, refCount, finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersUploadService extends IAdvancedUploadFileService {
  constructor(
    private uploadService: UploadFileService,
  ) {
    super();
  }

  public uploadFile(file: File): Observable<IUploadFileStatus> {
    const subject: BehaviorSubject<IUploadFileStatus> = new BehaviorSubject<IUploadFileStatus>(
      { fileName: file.name, status: UploadStatus.UPLOADING }
    );
    const maxRetryTimes = 60;
    const delayUnitTime = 1000;
    let retryTimes = 0;
    const uploadSvc$ = this.uploadService.uploadFile(file)
      .pipe(
        switchMap(
          (res: IUploadedFile) => this.uploadService.getFile(res.id).pipe(
            switchMap((fileRes: IUploadedFile) => {
              if (!fileRes.record_count) {
                throw of(new Error('users are not ready'));
              }
              return of(fileRes);
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
        (res: IUploadedFile) => {
          subject.next({
            fileName: file.name,
            status: UploadStatus.COMPLETED,
            nbRecords: res.record_count || null
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
