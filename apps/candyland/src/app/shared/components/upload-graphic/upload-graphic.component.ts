import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IGraphic } from '@cl-shared/models/graphick.model';

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
  @Input() selectGraphic: any;
  @Input() selectedGraphic: any;

  @Output() private selectUploadGraphic = new EventEmitter<IGraphic>();
  public imagePath;
  public imgURL: any;
  public message: string;
  public loadedImg = false;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public set setGraphic(val: any) {
    if (val !== undefined && this.selectedGraphic !== val) {
      this.onChange(val);
      this.onTouch(val);
    }
  }

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef) {}

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
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = this.sanitizeUrl(reader.result);
      this.loadedImg = true;
      this.setSelectedGraphic(this.imgURL);
      this.cd.markForCheck();
    };
  }

  public sanitizeUrl(data): any {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  public setActive() {
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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
  }

  writeValue(obj: any): void {
    this.setGraphic = obj;
  }

}
