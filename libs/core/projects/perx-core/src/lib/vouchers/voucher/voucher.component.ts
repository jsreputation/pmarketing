import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { Observable, of } from 'rxjs';
import { IVoucher, StatusLabelMapping } from '../models/voucher.model';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnChanges, OnInit {
  @Output() public redeem: EventEmitter<number> = new EventEmitter<number>();

  @Input()
  public hideMerchantImg: boolean = false;

  @Input()
  public hideMerchantName: boolean = false;

  @Input()
  public hideExpiry: boolean = false;

  @Input()
  public hideActions: boolean = false;

  @Input()
  public voucherId: number;

  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  @Input()
  public showRedeemedIcon: boolean = false;

  @Input()
  public mapping?: StatusLabelMapping;

  @Input()
  public redeemLabelFn: () => Observable<string>;

  @Input()
  public expiryFn: (v: IVoucher) => Observable<string>;

  @Input()
  public descriptionLabel: Observable<string> = of('Description');

  @Input()
  public tncLabel: Observable<string> = of('Terms and Conditions');

  constructor(private vouchersService: IVoucherService, private datePipe: DatePipe) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      this.voucher$ = this.vouchersService.get(this.voucherId).pipe(
        map((voucher: IVoucher) => {
          const tncWithOlPadding = voucher && voucher.reward && voucher.reward.termsAndConditions.replace(/(ol>)/, 'ol' +
            ' style="padding-inline-start:' +
            ' 1em;">');
          return {...voucher, reward: {...voucher.reward, termsAndConditions: tncWithOlPadding }} as IVoucher;
        }));
    }
  }

  public onClick(): void {
    this.redeem.emit(this.voucherId);
  }

  public ngOnInit(): void {
    if (!this.redeemLabelFn) {
      this.redeemLabelFn = () => of('REDEEM NOW');
    }

    if (!this.expiryFn) {
      this.expiryFn = (v: IVoucher) => of(`Expires on ${this.datePipe.transform(v.expiry, 'shortDate')}`);
    }
  }
}
