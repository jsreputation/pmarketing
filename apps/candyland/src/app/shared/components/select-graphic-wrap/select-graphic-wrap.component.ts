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

import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-select-graphic-wrap',
  templateUrl: './select-graphic-wrap.component.html',
  styleUrls: ['./select-graphic-wrap.component.scss'],
  providers: [
    {       provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectGraphicWrapComponent),
      multi: true
    }
  ]
})
export class SelectGraphicWrapComponent implements OnInit, ControlValueAccessor, OnDestroy {

  public set setGraphic(val: IGraphic) {
    if (val !== undefined && this.selectedGraphic !== val) {
      this.patchDefaultControl(val);
      this.selectedGraphic = val;
      this.onChange(val);
      this.onTouch(val);
    }
  }

  constructor(private fb: FormBuilder,
              private cd: ChangeDetectorRef) { }

  @Input() public graphicList: IGraphic[];
  @Input() public showUpload = true;
  @Output() private selectGraphic = new EventEmitter<IGraphic>();

  public selectedGraphic: IGraphic;
  public graphicForm: FormGroup;
  public controlUpload: AbstractControl;
  public controlDefault: AbstractControl;
  public destroy$ = new Subject();
  public lock: boolean;

  public onChange: any = () => {};
  public onTouch: any = () => {};

  ngOnInit() {
    this.createDefaultControl();
    this.createControl();
    this.subscribeControlDefaultValueChanges();
    this.subscribeControlUploadValueChanges();
  }

  public setSelectedGraphic(graphic: IGraphic): void {
    this.selectedGraphic = graphic;
    this.selectGraphic.emit(graphic);
    this.onChange(graphic);
    this.cd.markForCheck();
  }

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
    this.setGraphic = obj;
  }

  private createControl(): void {
    this.controlUpload = this.showUpload ? this.fb.control(null) : null;
  }

  private createDefaultControl() {
    if (!this.controlDefault) {
      this.controlDefault = this.fb.control(null);
    }
  }

  private patchDefaultControl(value: any): void {
    this.createDefaultControl();
    this.controlDefault.patchValue(value);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
