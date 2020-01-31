import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

import { AbstractControl, ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImageControlValue } from '@cl-helpers/image-control-value';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-select-graphic-wrap',
  templateUrl: './select-graphic-wrap.component.html',
  styleUrls: ['./select-graphic-wrap.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGraphicWrapComponent),
      multi: true
    }
  ]
})
export class SelectGraphicWrapComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() public graphicList: IGraphic[];
  @Input() public showUpload: boolean = true;
  @Input() public isRequired: boolean;
  @Input() public placeHolder: string;
  @Output() private selectGraphic: EventEmitter<IGraphic> = new EventEmitter<IGraphic>();

  public set setGraphic(val: any) {
    if (val !== undefined && this.selectedGraphic !== val) {
      const currentValue = ImageControlValue.getPrepareValue(val, this.graphicList);
      this.handlerPatchUploadImage(currentValue);
      this.patchDefaultControl(currentValue);
      this.selectedGraphic = currentValue;
    }
  }

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef) {
  }

  public selectedGraphic: IGraphic;
  public controlUpload: AbstractControl;
  public controlDefault: AbstractControl;
  private destroy$: Subject<void> = new Subject();
  public lock: boolean;

  public onChange: any = () => {
  }
  public onTouched: any = () => {
  }

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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
