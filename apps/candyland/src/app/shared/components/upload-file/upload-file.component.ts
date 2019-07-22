import { ChangeDetectorRef, Component, forwardRef, Input, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


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
export class UploadFileComponent implements ControlValueAccessor {
  MAX_SIZE = 1;
  @Input() selectGraphic: any;
  @Input() selectedGraphic: any;
  @Input() label = '';


  public lock: boolean;
  public fileName;
  public file: any;
  public message: string;
  public loadedFile = false;

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  constructor(private sanitizer: DomSanitizer,
              private cd: ChangeDetectorRef) {
  }

  public preview(files): void {
    this.message = null;
    if (files.length === 0) {
      return;
    }

    this.fileName = files[0].name;
    if (!(/\.csv$/i).test(this.fileName)) {
      this.message = 'Only .csv are supported.';
      return;
    }

    const fileSize = this.bitsToMBytes(files[0].size);
    if (fileSize > this.MAX_SIZE) {
      this.message = `File\'s size is ${fileSize.toFixed(1)}Mb more than ${this.MAX_SIZE}Mb`;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.file = this.sanitizeUrl(reader.result);
      this.loadedFile = true;
      this.cd.markForCheck();
    };
  }

  public sanitizeUrl(data): any {
    return this.sanitizer.bypassSecurityTrustUrl(data);
  }

  // public setActive() {
  //   this.loadedFile = true;
  //   this.onChange(this.file);
  // }

  public clear(): void {
    this.file = null;
    this.loadedFile = false;
  }

  // public setSelectedGraphic(graphic: any): void {
  //   this.selectUploadGraphic.emit(graphic);
  //   this.onChange(graphic);
  // }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.lock = isDisabled;
  }

  writeValue(obj: any): void {
    this.file = obj;
  }

  private bitsToMBytes(bit: number) {
    return (bit / 1000000);
  }

}
