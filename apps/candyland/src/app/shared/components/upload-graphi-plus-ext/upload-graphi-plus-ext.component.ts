import {ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { IUploadedFile } from '@cl-core/models/upload-file/uploaded-file.interface';
import {DialogPreviewSelectorComponent} from '@cl-shared/components/dialog-preview-selector/dialog-preview-selector.component';
import {MatDialog} from '@angular/material';
import {MultiUploadDialogComponent} from '@cl-shared/components/multi-upload-dialog/multi-upload-dialog.component';

@Component({
  selector: 'cl-upload-graphic-ext',
  templateUrl: './upload-graphi-plus-ext.component.html',
  styleUrls: ['./upload-graphi-plus-ext.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadGraphicExtComponent ),
      multi: true
    }
  ]
})
export class UploadGraphicExtComponent implements ControlValueAccessor {
  @Input() public placeholder: string = 'RECOMMENDED_FORMAT:_.JPG,_.PNG_OR_.GIF';
  @Input() public btnLabel: string = 'BTN_ADD_NEW';
  @Input() public classList: string = '';
  @Input() public isRequired: boolean;
  public previewOpen: boolean = false;

  @Input()
  public set selectGraphic(value: any) {
    if (value) {
      this.message = null;
      this._selectGraphic = value;
    }
  }

  @Output() private selectUploadGraphic: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  public lock: boolean;
  public imagePath: File;
  public imgURL: any;
  public message: string;
  public loadedImg: boolean = false;
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

  constructor(private cd: ChangeDetectorRef,
              public matDialog: MatDialog) {
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

  public onShowDialog(evt: MouseEvent): void {
    this.previewOpen = true;
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.matDialog.open(DialogPreviewSelectorComponent, {
      data: { trigger: target, img: 'ds' }, // img passed in after multiDialog opened
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe( _ => {
      this.previewOpen = false;
      this.cd.detectChanges();
    });
  }

  public multiUploadDialog(): void {
    const multiUploadDialogRef = this.matDialog.open(MultiUploadDialogComponent, {
      panelClass: 'audience-dialog'
    });
    multiUploadDialogRef.afterClosed().subscribe(res => {
      // should get the two images here, check condition how many uploaded
      console.log(res);
    })
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
