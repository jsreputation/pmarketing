import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IVoucher } from '../models/voucher.model';
import { IVoucherService } from '../ivoucher.service';

@Component({
  selector: 'perx-core-bcode-redemption',
  templateUrl: './bcode-redemption.component.html',
  styleUrls: ['./bcode-redemption.component.scss']
})
export class BcodeRedemptionComponent implements OnChanges {
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

  public bCode: string = ``;

  @Input('voucher')
  public voucher$: Observable<IVoucher>;

  constructor(
    private vouchersService: IVoucherService
  ) { }

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
}
