import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnDestroy, Optional,
  Output, Self, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { CsFormFieldControl } from '../form-field-control';
import { IUploadFileResponse, FileUploadStatus } from './upload-file-service.interface';
import { DefaultUploadFileService } from './default-upload-file.service';
import { IHttpParamsOptions } from '../../models/http-params-options.interface';


@Component({
  selector: 'cs-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: UploadFileComponent
    }
  ]
})
export class UploadFileComponent extends CsFormFieldControl<any>
  implements ControlValueAccessor, OnDestroy {

  public fileName: string | null;
  public message: string | null;
  public loading: boolean = false;

  @ViewChild('fileInput', {static: false}) public fileInput: HTMLInputElement;
  @Input() public requestOptions: IHttpParamsOptions = {};
  @Input() public accept: string = 'text/csv';
  @Input() public showInfo: boolean = true;
  @Output() public dropFile: EventEmitter<File> = new EventEmitter<File>();
  @Output() public uploadActions: EventEmitter<IUploadFileResponse> = new EventEmitter<IUploadFileResponse>();
  @Output() public deleteFile: EventEmitter<void> = new EventEmitter<void>();
  private destroy$: Subject<void> = new Subject();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Host() protected formField: MatFormField,
    @Optional() private uploadFileService: DefaultUploadFileService,
    private cd: ChangeDetectorRef
  ) {
    super('cs-upload-file', ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    if (formField) {
      this.showInfo = false;
    }
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ControlValueAccessor

  public onChange: any = () => {
  }

  public onTouched: any = () => {
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  // main logic
  public drop(files: FileList): void {
    if (files.length === 0) {
      return;
    }
    const file: File = files[0];
    this.dropFile.emit(file);
    this.setFileName(file.name);
    this.clearError();
    this.onTouched();
    if (this.uploadFileService) {
      this.upload(file);
    }
  }

  public delete(): void {
    this.setSelectedFile(null);
    this.setFileName(null);
    this.clearError();
    this.deleteFile.emit();
    this.cd.markForCheck();
  }

  private upload(file: File): void {
    this.uploadFileService.uploadFile(file, this.requestOptions)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(
        (res: IUploadFileResponse) => {
          this.uploadActions.emit(res);
          this.uploadFileHandler(res);
          this.cd.markForCheck();
        });
  }

  private uploadFileHandler(res: IUploadFileResponse): void {
    this.setFileName(res.fileName);
    this.setSelectedFile(res.value);
    switch (res.status) {
      case FileUploadStatus.success:
      case FileUploadStatus.successWithError:
        this.onTouched();
        this.setLoading(false);
        break;
      case FileUploadStatus.error:
        this.onTouched();
        this.setLoading(false);
        this.setError(res.errorMsg);
        break;
      case FileUploadStatus.processing:
      case FileUploadStatus.pending:
        if (this.control) {
          this.control.markAsUntouched();
        }
        this.setLoading(true);
        break;
    }
  }

  private setError(message: string | null = null): void {
    this.setSelectedFile(null);
    this.message = message;
    this.errorState = true;
    if (this.control) {
      this.control.setErrors({ serverError: message }, { emitEvent: false });
    }
  }

  private clearError(): void {
    this.message = null;
    this.errorState = false;
  }

  private setFileName(fileName: string | null = null): void {
    if (this.fileName !== fileName) {
      this.fileName = fileName;
    }
  }

  private setLoading(value: boolean): void {
    if (this.loading !== value) {
      this.loading = value;
    }
  }

  private setSelectedFile(file: string | null = null): void {
    if (this.value === file) {
      return;
    }
    this.value = file;
    this.onChange(file);
    this.onTouched();
  }
}
