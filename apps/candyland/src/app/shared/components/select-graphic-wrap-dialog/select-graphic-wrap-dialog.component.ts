import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {ImageControlValue} from '@cl-helpers/image-control-value';
import {MultiUploadDialogComponent} from '@cl-shared/components/multi-upload-dialog/multi-upload-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'cl-select-graphic-wrap-dialog',
  templateUrl: './select-graphic-wrap-dialog.component.html',
  styleUrls: ['./select-graphic-wrap-dialog.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGraphicWrapDialogComponent),
      multi: true
    }
  ]
})
export class SelectGraphicWrapDialogComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Output() private selectGraphic: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  @Input() public graphicList: IGraphic[];
  @Input() public showUpload: boolean = true;
  @Input() public isRequired: boolean;
  @Input() public placeHolder: string;
  @Input() public isMultiObj: {[key: string]: boolean};

  public selectedGraphic: IGraphic;
  public controlUpload: AbstractControl;
  public controlDefault: AbstractControl;
  private destroy$: Subject<void> = new Subject();
  public graphicUploaded: IGraphic;
  public lock: boolean;

  public onChange: any = () => {
  }
  public onTouched: any = () => {
  }

  public set setGraphic(val: any) {
    if (val !== undefined && this.selectedGraphic !== val) {
      const currentValue = ImageControlValue.getPrepareValue(val, this.graphicList);
      if (this.isMultiObj && !this.graphicList.some(graphic => graphic.img === val.img)) {
        this.graphicUploaded = val;
      } else {
        this.handlerPatchUploadImage(currentValue);
      }
      this.patchDefaultControl(currentValue);
      this.selectedGraphic = currentValue;
    }
  }

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              public matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.createDefaultControl();
    this.createControl();
    this.subscribeControlDefaultValueChanges();
    this.subscribeControlUploadValueChanges();
  }

  public handlerPatchUploadImage(currentValue: any): void {
    if (this.checkTypeOfImages(currentValue)) {
      this.patchValueUploadControl(currentValue);
    }
  }

  public checkTypeOfImages(type: any): boolean {
    return typeof type === 'string';
  }

  public patchValueUploadControl(currentValue: string): void {
    this.controlUpload.patchValue(currentValue);
  }

  public setSelectedGraphic(graphic: IGraphic): void {
    this.selectedGraphic = graphic;
    this.selectGraphic.emit(graphic);
    this.onChange(graphic);
    this.onTouched();
    this.cd.markForCheck();
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

  private createControl(): void {
    this.controlUpload = this.showUpload ? this.fb.control(null) : null;
  }

  private createDefaultControl(): void {
    if (!this.controlDefault) {
      this.controlDefault = this.fb.control(null);
    }
  }

  private patchDefaultControl(value: any): void {
    this.createDefaultControl();
    this.controlDefault.patchValue(value, {emitEvent: false});
  }

  private subscribeControlDefaultValueChanges(): void {
    this.controlDefault.valueChanges
      .pipe(
        debounceTime(1),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.setSelectedGraphic(value);
      });
  }

  private subscribeControlUploadValueChanges(): void {
    if (!this.controlUpload) {
      return;
    }

    this.controlUpload.valueChanges
      .pipe(
        debounceTime(1),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.setSelectedGraphic(value);
      });
  }

  public openMultiUpLoadDialog(): void {
    const dialogRef = this.matDialog.open(MultiUploadDialogComponent, {
      data: { img: this.graphicUploaded, imgSegments: this.isMultiObj,
        placeHolder: this.placeHolder }, panelClass: 'multi-upload-dialog'
    });
    dialogRef.afterClosed().subscribe( data => {
      if (!data) {
        return;
      }
      this.graphicUploaded = data;
      this.setSelectedGraphic(this.graphicUploaded);
      this.cd.detectChanges();
    });
  }

  public clear(): void {
    this.graphicUploaded = undefined;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
