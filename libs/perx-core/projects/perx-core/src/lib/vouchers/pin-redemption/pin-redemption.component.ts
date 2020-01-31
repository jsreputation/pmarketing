import { Component, OnInit, Input, Output, ElementRef, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PinService } from '../pin.service';
import { IVoucherService } from '../ivoucher.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { IVoucher } from '../models/voucher.model';

/**
 * @todo this component currently implements its own logic, it should actually leverage pin-input component from UtilsModule
 */
@Component({
  selector: 'perx-core-pin-redemption',
  templateUrl: './pin-redemption.component.html',
  styleUrls: ['./pin-redemption.component.scss']
})
export class PinRedemptionComponent implements OnInit, OnChanges {
  @Input()
  public length: number = 4;
  @Input()
  public voucherId: number;
  @Input()
  public voucher: IVoucher;

  @Output()
  public full: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public hasErrorEmit: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public update: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public pinFocused: EventEmitter<boolean> = new EventEmitter<boolean>();

  public pinCode: string;

  public controls: FormControl[] = [];
  public hasError: string = '';

  constructor(
    private element: ElementRef,
    private pin: PinService,
    private vouchersService: IVoucherService
  ) {
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

  public ngOnChanges(simpleChanges: SimpleChanges): void {
    if (simpleChanges.voucherId) {
      this.pin.getPin(this.voucherId).subscribe(code => {
        this.pinCode = code;
      });
    } else if (simpleChanges.voucher) {
      this.pin.getPin(this.voucher.id).subscribe(code => {
        this.pinCode = code;
      });
    }
  }

  public onUpdate(): void {
    const v = this.value;
    if (v.length === this.length) {
      // if full length reached, emit on complete
      if (this.validateCode(v)) {
        this.redeemVoucher();
      }
    } else {
      // move to next input box
      const elem: HTMLInputElement = this.element.nativeElement.querySelector(`#input_${v.length}`);
      if (elem !== null) {
        elem.focus();
      }
    }

    this.update.emit(v);
  }

  public redeemVoucher(): void {
    this.vouchersService.redeemVoucher(this.voucherId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.hasErrorEmit.emit(err.status);
          return of('Redeem failed');
        })
      ).subscribe(res => {
        if (res !== 'Redeem failed') {
          this.full.emit(this.value);
        }
      });
  }

  public validateCode(code: string): boolean {
    const isValid = !!(code === this.pinCode);
    this.hasError = isValid ? '' : 'error';

    return isValid;
  }

  public get value(): string {
    return this.controls.reduce((p: string, v: FormControl): string => v.value === null ? p : `${p}${v.value}`, '');
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

  public resetAll(): void {
    this.hasError = '';
    this.controls.forEach(ctrl => {
      ctrl.setValue('');
    });
  }
}
