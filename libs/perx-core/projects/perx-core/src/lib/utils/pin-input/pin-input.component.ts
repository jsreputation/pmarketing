import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'perx-core-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss']
})
export class PinInputComponent implements OnInit {
  @Input()
  public length: number = 4;

  @Input()
  public error: boolean = false;

  @Output()
  public full: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public update: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public pinFocused: EventEmitter<boolean> = new EventEmitter<boolean>();

  public controls: FormControl[] = [];

  constructor(
    private element: ElementRef,
  ) {
  }

  public get hasError(): string {
    return this.error ? 'error' : '';
  }

  public ngOnInit(): void {
    // length might not be a number
    if (typeof this.length === 'string') {
      this.length = Number.parseInt(this.length, 10);
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.length; i++) {
      const ctrl = new FormControl();
      this.controls.push(ctrl);
    }
    // listen to each FormControl
    this.controls.forEach(ctrl => ctrl.valueChanges.subscribe(() => this.onUpdate()));
  }

  public onUpdate(): void {
    const v = this.value;
    if (v.length === this.length) {
      this.full.emit(this.value);
    } else {
      // move to next input box
      const elem: HTMLInputElement = this.element.nativeElement.querySelector(`#input_${v.length}`);
      if (elem !== null) {
        elem.focus();
      }
    }

    this.update.emit(v);
  }

  get value(): string {
    return this.controls.reduce((p: string, v: FormControl): string => {
      return v.value === null ? p : `${p}${v.value}`;
    }, '');
  }

  public onKey(event: KeyboardEvent): void {
    // remove last letter
    if (event.key === 'Backspace') {
      const v = this.value;
      if (v.length > 0 && v.length < this.length) {
        this.controls[v.length - 1].setValue('');
      }
      event.stopPropagation();
    }
  }

  public onBlur(): void {
    this.pinFocused.emit(false);
  }

  public onFocus(): void {
    this.pinFocused.emit(true);
  }
}
