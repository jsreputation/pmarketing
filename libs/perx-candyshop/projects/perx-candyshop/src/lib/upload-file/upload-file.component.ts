import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewChild} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {IUploadedFile} from '../../models/uploaded-file.interface';
import {UploadFileService} from './upload-file.service';

@Component({
  selector: 'cs-upload-file',
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
export class UploadFileComponent implements ControlValueAccessor {
  public MAX_SIZE: number = 1;
  @ViewChild('fileInput', {static: false}) public fileInput: HTMLInputElement;
  @Input() public downloadFile: string = 'assets/files/Users_template.csv';
  @Input() public isRequired: boolean;
  @Input() public label: string = '';
  @Input() public downloadButtonText: string = 'Download a sample file';
  @Input() public uploadButtonText: string = 'Upload file a list';
  @Input() public requiredErrorText: string = 'Required field';
  @Output() public deleteFile: EventEmitter<any> = new EventEmitter();
  @Output() public uploadFile: EventEmitter<any> = new EventEmitter();

  public lock: boolean;
  public fileName: string;
  public fileURL: string;
  public file: any;
  public message: string | null;
  public loadedFile: boolean | null = false;

  public onChange: any = () => {
  }

  public onTouched: any = () => {
  }

  constructor(private sanitizer: DomSanitizer,
              private uploadFileService: UploadFileService,
              private cd: ChangeDetectorRef) {
  }

  public preview(files: FileList): void {
    this.message = null;
    if (files.length === 0) {
      this.setError('Empty file.');
      return;
    }

    this.fileName = files[0].name;
    if (!(/\.csv$/i).test(this.fileName)) {
      this.setError('Only .csv are supported.');
      return;
    }

    const fileSize = this.bitsToMBytes(files[0].size);
    if (fileSize > this.MAX_SIZE) {
      this.setError(`File\'s size is ${fileSize.toFixed(1)}Mb more than ${this.MAX_SIZE}Mb`);
      return;
    }

    this.fetchFile(files[0]);
  }

  public sanitizeUrl(data: any): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public clear(): void {
    this.file = null;
    this.onChange(this.file);
    this.loadedFile = false;
    this.deleteFile.emit(this.file);
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
    this.uploadFileService.uploadFile(file)
      .subscribe((res: IUploadedFile) => {
        this.file = res;
        this.fileURL = res.url;
        this.loadedFile = true;
        this.setSelectedFile(res.url);
        this.message = null;
        this.cd.markForCheck();
      },
      (err: Error) => {
        this.setError('File haven\'t loaded successfully!', err.message);
        this.cd.markForCheck();
      });
  }

  private setError(message: string, serverError?: string): void {
    this.onTouched();
    this.loadedFile = null;
    this.setSelectedFile(null);
    this.message = message;
    if (serverError) {
      console.warn(serverError);
    }
  }

  private setSelectedFile(file: any): void {
    this.uploadFile.emit(file);
    this.onChange(file);
    this.onTouched();
  }

}
