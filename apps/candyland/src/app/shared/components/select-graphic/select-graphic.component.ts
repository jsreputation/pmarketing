import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { IGraphic } from '@cl-shared/models/graphick.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cl-select-graphic',
  templateUrl: './select-graphic.component.html',
  styleUrls: ['./select-graphic.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGraphicComponent),
      multi: true
    }
  ]
})
export class SelectGraphicComponent implements OnInit, ControlValueAccessor {
  @Input() public selectedGraphic: IGraphic;
  @Input() public graphicList: IGraphic[];
  @Output() private selectGraphic = new EventEmitter<IGraphic>();

  public onChange: any = () => {};
  public onTouch: any = () => {};

  public set setGraphic(val: IGraphic) {
    if (val !== undefined && this.selectedGraphic !== val) {
      this.selectedGraphic = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  constructor() { }

  ngOnInit() {
  }

  public setSelectedGraphic(graphic: IGraphic): void {
    this.selectedGraphic = graphic;
    this.selectGraphic.emit(graphic);
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
