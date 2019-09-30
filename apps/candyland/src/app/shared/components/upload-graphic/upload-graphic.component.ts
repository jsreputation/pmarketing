import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadFileService } from '@cl-core-services';

@Component({
  selector: 'cl-upload-graphic',
  templateUrl: './upload-graphic.component.html',
  styleUrls: ['./upload-graphic.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadGraphicComponent),
      multi: true
    }
  ]
})
export class UploadGraphicComponent implements ControlValueAccessor {
  @Input() public placeholder = 'Recommended format: .JPG or .PNG';
  @Input() public btnLabel = '+ Add New';
  @Input() public classList = '';
  @Input() public isRequired: boolean;

  @Input()
  public set selectGraphic(value: any) {
    if (value) {
      this.message = null;
      this._selectGraphic = value;
    }
  }

  @Output() private selectUploadGraphic = new EventEmitter<IGraphic>();
  public lock: boolean;
  public imagePath;
  public imgURL: any;
  public message: string;
  public loadedImg = false;
  // tslint:disable
  public _selectGraphic: any;

  public onChange: any = () => {
  };
  public onTouched: any = () => {
  };

  public set setGraphic(val: any) {
    if (val !== undefined) {
      this.onTouched(val);
      this.imgURL = val;
      this.message = null;
    }
  }

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef,
              private uploadFileService: UploadFileService) {
  }

  public preview(files): void {
    this.message = null;
    if (files.length === 0) {
      this.setError('Empty file.');
      return;
    }

    const mimeName = files[0].name;
    if (!(/\.(jpg|jpeg|png)$/i).test(mimeName)) {
      this.setError('Only .JPG or .PNG are supported.');
      return;
    }
    this.imagePath = files;
    this.uploadImage(files[0]);
  }

  public sanitizeUrl(data): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public setActive(): void {
    this.loadedImg = true;
    this.onChange(this.imgURL);
  }

  public clear(): void {
    this.imgURL = null;
    this.loadedImg = false;
    this.onChange(null);
    this.onTouched();
  }

  public setSelectedGraphic(graphic: any): void {
    this.selectUploadGraphic.emit(graphic);
    this.onChange(graphic);
    this.onTouched();
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
    this.setGraphic = obj;
  }

  private uploadImage(file: File): void {
    this.uploadFileService.uploadFile(file)
      .subscribe((res: IUploadedFile) => {
          this.imgURL = res.url;
          this.loadedImg = true;
          this.setSelectedGraphic(res.url);
          this.message = null;
          this.cd.markForCheck();
        },
        (err: Error) => {
          this.setError('Image haven\'t loaded successfully!', err.message);
          this.cd.markForCheck();
        });
  }

  private setError(message: string, serverError?: string) {
    this.onTouched();
    this.loadedImg = false;
    this.setSelectedGraphic(null);
    this.message = message;
    if (serverError) {
      console.warn(serverError);
    }
  }
}
