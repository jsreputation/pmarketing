import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { VouchersService } from './vouchers.service';
import { Observable } from 'rxjs';
import { IVoucher } from './models/voucher.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  @Input() public filter: string;
  @Input() public imageSize: string;
  @Input() public iconDisplay: string;
  @Input() public showTitle: boolean = true;
  @Input() public showMerchant: boolean = true;
  @Input() public showExpireDate: boolean = true;
  @Input() public showRedeemedDate: boolean = false;
  @Input() public showRedeemedIcon: boolean = true;
  @Input() public canSelectRedeemed: boolean = false;

  @Output() public route: EventEmitter<number | string> = new EventEmitter<number | string>();

  public vouchers$: Observable<IVoucher[]>;

  constructor(private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    this.vouchers$ = this.vouchersService.getAll().pipe(
      map(vouchers => {
        return vouchers.filter(v => v.state === this.filter);
      })
    );
  }

  public onClick(voucher: { id: number, state: string, name: string, img: string, description: string, expiresAt: string }): void {
    if (!this.canSelectRedeemed && voucher.state === 'redeemed') {
      return;
    }
    this.route.emit(voucher.id);
  }
}
