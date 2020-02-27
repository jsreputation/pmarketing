import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { IVoucher } from '../models/voucher.model';
import { PinInputComponent } from '../../utils/pin-input/pin-input.component';

/**
 * @todo this component currently implements its own logic, it should actually leverage pin-input component from UtilsModule
 */
@Component({
  selector: 'perx-core-pin-redemption',
  templateUrl: './pin-redemption.component.html',
  styleUrls: ['./pin-redemption.component.scss']
})
export class PinRedemptionComponent implements OnInit {
  @Input()
  public length: number = 4;;

  @Input()
  public errorMessage: string = 'Incorrect code';
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

  @ViewChild('pinInput', { static: false })
  private pinInputComponent: PinInputComponent;

  public error: boolean;

  constructor(
    private vouchersService: IVoucherService
  ) {
  }

  public ngOnInit(): void {
    // length might not be a number
    if (typeof this.length === 'string') {
      this.length = Number.parseInt(this.length, 10);
    }
  }

  public redeemVoucher(pin: string): void {
    this.vouchersService.redeemVoucher(this.voucherId)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.hasErrorEmit.emit(err.status);
          this.error = true;
          return of('Redeem failed');
        })
      ).subscribe(res => {
        if (res !== 'Redeem failed') {
          this.full.emit(pin);
        }
      });
  }

  public resetAll(): void {
    this.pinInputComponent.resetAll();
  }

  public updatePin(): void {
    this.update.emit();
  }

  public isPinFocused(): void {
    this.pinFocused.emit(true);
  }
}
