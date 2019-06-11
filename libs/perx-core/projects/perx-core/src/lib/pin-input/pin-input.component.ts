import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'perx-core-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.css']
})
export class PinInputComponent implements OnInit {
  @Input()
  length = 4;

  @Output()
  full: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  update: EventEmitter<string> = new EventEmitter<string>();

  controlls: FormControl[] = [];

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    // length might not be a number
    if (typeof this.length === 'string') {
      this.length = Number.parseInt(this.length, 10);
    }

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.length; i++) {
      const ctrl = new FormControl();
      this.controlls.push(ctrl);
    }
    // listen to each FormControl
    this.controlls.forEach(ctrl => ctrl.valueChanges.subscribe(() => this.onUpdate()));
  }

  onUpdate() {
    const v = this.value;
    if (v.length === this.length) {
      // if full length reached, emit on complete
      this.full.emit(v);
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
    return this.controlls.reduce((p: string, v: FormControl): string => {
      return v.value === null ? p : `${p}${v.value}`;
    }, '');
  }

  onKey(event: KeyboardEvent): void {
    // remove last letter
    if (event.key === 'Backspace') {
      const v = this.value;
      if (v.length > 0 && v.length < this.length) {
        this.controlls[v.length - 1].setValue('');
      }
      event.stopPropagation();
    }
  }
}
