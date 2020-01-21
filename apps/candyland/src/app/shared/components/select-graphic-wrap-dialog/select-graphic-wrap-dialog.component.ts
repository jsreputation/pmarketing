import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DialogPreviewSelectorComponent} from '@cl-shared/components/dialog-preview-selector/dialog-preview-selector.component';
import {MatDialog} from '@angular/material';
import {AbstractControl, FormBuilder} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {ImageControlValue} from '@cl-helpers/image-control-value';

@Component({
  selector: 'cl-select-graphic-wrap-dialog',
  templateUrl: './select-graphic-wrap-dialog.component.html',
  styleUrls: ['./select-graphic-wrap-dialog.component.scss']
})
export class SelectGraphicWrapDialogComponent implements OnInit, OnDestroy {
  @Output() private selectColor: EventEmitter<string> = new EventEmitter<string>();
  @Output() private selectGraphic: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();
  @Input() public graphicList: IGraphic[];
  @Input() public showUpload: boolean = true;
  @Input() public isRequired: boolean;
  public selectedGraphic: IGraphic;
  public controlUpload: AbstractControl;
  public controlDefault: AbstractControl;
  private destroy$: Subject<void> = new Subject();
  public lock: boolean;

  public onChange: any = () => {
  }
  public onTouched: any = () => {
  }

  public set setGraphic(val: any) {
    if (val !== undefined && this.selectedGraphic !== val) {
      const currentValue = ImageControlValue.getPrepareValue(val, this.graphicList);
      this.handlerPatchUploadImage(currentValue);
      this.patchDefaultControl(currentValue);
      this.selectedGraphic = currentValue;
    }
  }

  constructor(public matDialog: MatDialog, private fb: FormBuilder,
              private cd: ChangeDetectorRef) { }

  public ngOnInit(): void {
    this.createDefaultControl();
    this.createControl();
    this.subscribeControlDefaultValueChanges();
    this.subscribeControlUploadValueChanges();
  }

  // Call the dialog
  public onShowDialog(evt: MouseEvent): void {
    const target = new ElementRef(evt.currentTarget);
    const dialogRef = this.matDialog.open(DialogPreviewSelectorComponent, {
      data: { trigger: target },
      panelClass: 'custom-dialog-container'
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log(res);
      this.selectColor.emit('i am a color bro');
    });
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
