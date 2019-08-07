import { ChangeDetectorRef, Component, EventEmitter, forwardRef, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cl-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadImageComponent),
      multi: true
    }
  ]
})
export class UploadImageComponent implements OnInit, ControlValueAccessor  {

  @Output() private selectUploadGraphic = new EventEmitter<IGraphic>();
  @ViewChild('fileInput', {static: true}) public htmlInput: HTMLInputElement;
  public lock: boolean;
  public imagePath;
  public imgURL: any;
  public message: string;
  public loadedImg = false;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public set setGraphic(val: any) {
    if (val !== undefined) {
      this.onChange(val);
      this.onTouch(val);
      this.imgURL = val;
    }
  }

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef) {}

  public preview(input: HTMLInputElement): void {
    const files = input.files;
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
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = this.sanitizeUrl(reader.result);
      this.loadedImg = true;
      this.setSelectedGraphic(this.imgURL);
      input.value = null;
      this.cd.markForCheck();
    };
  }

  public sanitizeUrl(data): any {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public setActive(): void {
    this.loadedImg = true;
    this.onChange(this.imgURL);
  }

  public clear(): void {
    this.imgURL = null;
    this.loadedImg = false;
    this.setGraphic = null;
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

  public ngOnInit(): void {
  }

}
