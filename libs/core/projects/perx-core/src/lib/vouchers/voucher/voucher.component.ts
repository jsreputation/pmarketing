import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { Observable, of } from 'rxjs';
import { IVoucher, StatusLabelMapping } from '../models/voucher.model';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { NotificationService } from '../../utils/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { RedemptionType } from '../../perx-core.models';

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

  @Input()
  public showCopyButton: boolean = true;

  public rt: typeof RedemptionType = RedemptionType;
  private copyToClipboardTxt: string;
  private clipboardErrorTxt: string;


  constructor(private vouchersService: IVoucherService,
              private datePipe: DatePipe,
              private notificationService: NotificationService,
              private translateService: TranslateService) {
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
    this.initTranslate();
    if (!this.redeemLabelFn) {
      this.redeemLabelFn = () => of('REDEEM NOW');
    }

    if (!this.expiryFn) {
      this.expiryFn = (v: IVoucher) => of(`Expires on ${this.datePipe.transform(v.expiry, 'shortDate')}`);
    }
  }
  public copy(code: string): void {
    navigator.clipboard
      .writeText(code)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.translateService
      .get([
        'REDEMPTION.COPY_TO_CLIPBOARD',
        'REDEMPTION.CLIPBOARD_ERROR_TXT',
      ])
      .subscribe((res: any) => {
        this.copyToClipboardTxt = res['REDEMPTION.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['REDEMPTION.CLIPBOARD_ERROR_TXT'];
      });
  }
}
