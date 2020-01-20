import {Component, ElementRef, EventEmitter, forwardRef, Input, Optional, Output} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import {DialogColorSelectorComponent} from '@cl-shared/components/dialog-color-selector/dialog-color-selector.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'cl-select-graphic',
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
  @Output() private selectColor: EventEmitter<string> = new EventEmitter<string>();

  public constructor(@Optional() public matDialog: MatDialog) {
  }
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

  // Call the dialog
  public onShowDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.matDialog.open(DialogColorSelectorComponent, {
      data: { trigger: target },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.selectColor.emit('i am a color bro');
    });
  }

}
