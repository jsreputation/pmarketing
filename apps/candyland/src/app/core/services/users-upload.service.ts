import { IAdvancedUploadFileService, IUploadFileStatus, UploadStatus } from './iadvanced-upload-file.service';
import {Observable, of, throwError} from 'rxjs';
import { Injectable } from '@angular/core';
import { UploadFileService } from '@cl-core-services';
import {switchMap, retryWhen, mergeMap, delay} from 'rxjs/operators';

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
    return new Observable(subject => {
      const maxRetryTimes = 60;
      const delayUnitTime = 1000;
      let retryTimes = 0;
      subject.next({ fileName: file.name, status: UploadStatus.UPLOADING });
      const subscription = this.uploadService.uploadFile(file)
        .pipe(
          switchMap(
            (res: IUploadedFile) => this.uploadService.getFile(res.id).pipe(
              switchMap((fileRes: IUploadedFile) => {
                if (!fileRes.status === FileUploadStatus.success) {
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
        ).subscribe(
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
      return () => subscription.unsubscribe();
    });
  }

}
