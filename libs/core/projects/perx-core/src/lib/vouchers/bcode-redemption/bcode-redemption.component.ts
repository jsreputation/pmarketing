import {
  Component,
  OnChanges,
  Input,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';
import { IVoucherService } from '../ivoucher.service';
import { NotificationService } from '../../utils/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-core-bcode-redemption',
  templateUrl: './bcode-redemption.component.html',
  styleUrls: ['./bcode-redemption.component.scss']
})
export class BcodeRedemptionComponent implements OnChanges, OnInit {
  @Input()
  public voucherId: number | null = null;

  @Input()
  public instructions: string = 'Present this code to the cashier to complete your transaction.';

  public showImage: boolean = true;
  public showVoucherName: boolean = true;
  public showAfterInstruction: boolean = false;
  @Input()
  public showTermsAndCondition: boolean = true;

  @Input()
  public useMinimalStyle: boolean = false;

  public bCode: string = '';

  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  @Input()
  public showCopyButton: boolean = true;

  private copyToClipboardTxt: string;
  private clipboardErrorTxt: string;

  constructor(
    private vouchersService: IVoucherService,
    private notificationService: NotificationService,
    private translateService: TranslateService,
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId && this.voucherId !== null) {
      this.voucher$ = this.vouchersService.get(this.voucherId);
    }

    if (changes.useMinimalStyle && this.useMinimalStyle) {
      this.useMinimalStyle = true;
      this.showImage = false;
      this.showVoucherName = false;
      this.showTermsAndCondition = false;
      this.showAfterInstruction = true;
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
        'REFERRAL.COPY_TO_CLIPBOARD',
        'REFERRAL.CLIPBOARD_ERROR_TXT',
      ])
      .subscribe((res: any) => {
        this.copyToClipboardTxt = res['REFERRAL.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['REFERRAL.CLIPBOARD_ERROR_TXT'];
      });
  }
}
