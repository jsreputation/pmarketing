import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, Output} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAdvancedUploadFileService, IUploadFileStatus, FileUploadStatus } from '@cl-core/services/iadvanced-upload-file.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'cl-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements ControlValueAccessor, OnDestroy {
  public MAX_SIZE: number = 1;
  @Input() public label: string = '';
  @Input() public isRequired: boolean;
  @Input() public downloadFile: string = 'assets/files/Users_template.csv';
  @Input() public options: any;
  @Output() public deleteFile: EventEmitter<void> = new EventEmitter();
  @Output() public uploadFile: EventEmitter<number> = new EventEmitter();

  public lock: boolean;
  public fileName: string;
  public file: IUploadedFile | null;
  public message: string;
  public loadedFile: boolean = false;
  public loadingFile: boolean = false;
  private destroy$: Subject<void> = new Subject();

  public onChange: any = () => { };

  public onTouched: any = () => { };

  constructor(
    private sanitizer: DomSanitizer,
    private uploadFileService: IAdvancedUploadFileService,
    private cd: ChangeDetectorRef
  ) { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public preview(files: FileList): void {
    this.message = null;
    if (files.length === 0) {
      this.setError('Empty file.');
      return;
    }
    const file: File = files[0];

    this.fileName = file.name;
    if (!(/\.csv$/i).test(this.fileName)) {
      this.setError('Only .csv are supported.');
      return;
    }

    const fileSize = this.bitsToMBytes(file.size);
    if (fileSize > this.MAX_SIZE) {
      this.setError(`File\'s size is ${fileSize.toFixed(1)}Mb more than ${this.MAX_SIZE}Mb`);
      return;
    }
    this.fetchFile(file);
  }

  public sanitizeUrl(data: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public clear(): void {
    this.file = null;
    this.onChange(this.file);
    this.loadedFile = false;
    this.deleteFile.emit();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.lock = isDisabled;
  }

  public writeValue(obj: any): void {
    this.file = obj;
  }

  private bitsToMBytes(bit: number): number {
    return (bit / 1000000);
  }

  private fetchFile(file: File): void {
    this.uploadFileService.uploadFile(file, this.options)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res: IUploadFileStatus) => {
          switch (res.status) {
            case FileUploadStatus.success:
            case FileUploadStatus.successWithError:
              this.loadedFile = true;
              this.setSelectedFile(res.fileName);
              this.message = null;
              this.loadingFile = false;
              this.uploadFile.emit(res.nbRecords || null);
              break;
            case FileUploadStatus.error:
              this.loadedFile = false;
              this.setSelectedFile(null);
              this.uploadFile.emit(null);
              this.message = res.errorMsg || 'File haven\'t loaded successfully!';
              this.loadingFile = false;
              break;
            case FileUploadStatus.processing:
            case FileUploadStatus.pending:
              this.loadedFile = false;
              this.setSelectedFile(res.fileName);
              this.message = null;
              this.loadingFile = true;
              break;
          }
          this.cd.markForCheck();
        },
        (err: Error) => {
          this.setError('File haven\'t loaded successfully!', err.message);
          this.cd.markForCheck();
        });
  }

  private setError(message: string, serverError?: string): void {
    this.onTouched();
    this.loadedFile = false;
    this.setSelectedFile(null);
    this.message = message;
    if (serverError) {
      console.warn(serverError);
    }
  }

  private setSelectedFile(file: string | null): void {
    // this.uploadFile.emit(file);
    this.onChange(file);
    this.onTouched();
  }
}
