import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UploadFileService } from '@cl-core-services';
import { throwError } from 'rxjs';

@Component({
  selector: 'cl-upload-graphic',
  templateUrl: './upload-graphic.component.html',
  styleUrls: ['./upload-graphic.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadGraphicComponent),
      multi: true
    }
  ]
})
export class UploadGraphicComponent implements ControlValueAccessor {
  @Input() public placeholder = 'Recommended format: .JPG or .PNG';
  @Input() public classList = '';
  @Input() public selectGraphic: any;
  @Input() public selectedGraphic: any;

  @Output() private selectUploadGraphic = new EventEmitter<IGraphic>();
  public lock: boolean;
  public imagePath;
  public imgURL: any;
  public message: string;
  public loadedImg = false;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public set setGraphic(val: any) {
    if (val !== undefined ) {
      this.onTouch(val);
      this.imgURL = val;
    }
  }

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef,
              private uploadFileService: UploadFileService) {}

  public preview(files): void {
    this.message = null;
    if (files.length === 0) {
      return;
    }

    const mimeName = files[0].name;
    if (!(/\.(jpg|jpeg|png)$/i).test(mimeName)) {
      this.message = 'Only .JPG or .PNG are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    console.log(files[0]);

    this.uploadImage(files[0]);
    // TODO: after successful load image need delete code below
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = this.sanitizeUrl(reader.result);
      this.loadedImg = true;
      this.setSelectedGraphic(this.imgURL.changingThisBreaksApplicationSecurity);
      this.cd.markForCheck();
    };
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
  }

  public setSelectedGraphic(graphic: any): void {
    this.selectUploadGraphic.emit(graphic);
    this.onChange(graphic);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.lock = isDisabled;
  }

  public writeValue(obj: any): void {
    this.setGraphic = obj;
  }

  private uploadImage(file: File): void {
    this.uploadFileService.uploadFile(file)
      .subscribe(res => {
        console.log(res);
        this.imgURL = res;
        this.loadedImg = true;
        this.setSelectedGraphic(res);
        this.message = null;
        this.cd.markForCheck();
      }, err => {
        // TODO: need show error message
        console.warn(err);
        this.message = 'Image haven\'t loaded successfully!';
      });
  }

}
