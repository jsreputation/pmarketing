import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { IGraphic } from '../../models/graphic.interface';

@Component({
  selector: 'cs-select-graphic',
  templateUrl: './select-graphic.component.html',
  styleUrls: ['./select-graphic.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGraphicComponent),
      multi: true
    }
  ]
})
export class SelectGraphicComponent implements ControlValueAccessor {
  @Input() public selectedGraphic: IGraphic;
  @Input() public graphicList: IGraphic[];
  @Output() private selectGraphic: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  public lock: boolean;
  public onChange: any = () => {
  }
  public onTouched: any = () => {
  }

  public set setGraphic(val: IGraphic) {
    if (val !== undefined && this.selectedGraphic !== val) {
      this.selectedGraphic = val ? ImageControlValue.getPrepareValue(val, this.graphicList) : null;
    }
  }

  public setSelectedGraphic(graphic: IGraphic): void {
    this.selectedGraphic = graphic;
    this.selectGraphic.emit(graphic);
    this.onChange(graphic);
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
