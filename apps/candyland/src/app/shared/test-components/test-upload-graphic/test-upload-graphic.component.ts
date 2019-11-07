import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
// tslint:disable
@Component({
  selector: 'cl-upload-graphic',
  templateUrl: './test-upload-graphic.component.html',
  styleUrls: ['./test-upload-graphic.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestUploadGraphicComponent),
      multi: true
    }
  ]
})
export class TestUploadGraphicComponent implements OnInit {
  @Input() public placeholder: string = '';
  @Input() public btnLabel: string = '';
  @Input() public classList: string = '';
  @Input() public isRequired: boolean;

  @Input()
  public set selectGraphic(value: any) {
    this.setGraphic = value;
  }
  public setGraphic: any;
  public lock: any;

  public onChange: any = () => {
  };
  public onTouched: any = () => {
  };
  constructor() { }

  ngOnInit() {
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
}
