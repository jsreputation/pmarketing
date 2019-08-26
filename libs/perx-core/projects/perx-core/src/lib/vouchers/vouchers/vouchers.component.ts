import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { VouchersService } from '../vouchers.service';
import { Observable } from 'rxjs';
import { IVoucher, StatusLabelMapping } from '../models/voucher.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {
  @Input() public filter: string[];
  @Input() public imageSize: string;
  @Input() public iconDisplay: string;
  @Input() public showTitle: boolean = true;
  @Input() public showMerchant: boolean = true;
  @Input() public showExpireDate: boolean = true;
  @Input() public showRedeemedDate: boolean = true;
  @Input() public showRedeemedIcon: boolean = true;
  @Input() public canSelectRedeemed: boolean = false;

  /**
   * @deprecated
   */
  @Output() public route: EventEmitter<number | string> = new EventEmitter<number | string>();
  @Output() public tapped: EventEmitter<IVoucher> = new EventEmitter<IVoucher>();

  @Input('data')
  public set vouchers$(vouchers: Observable<IVoucher[]>) { 
    this.originalVouchers$ = this.filter  && this.filter.length && vouchers ? vouchers
    .pipe(map(voucher=> voucher.filter(v => this.filter.includes(v.state)))): vouchers;
  };
  public get vouchers$(): Observable<IVoucher[]> {
    return this.originalVouchers$;
  };
  private originalVouchers$: Observable<IVoucher[]>;

  @Input()
  public mapping: StatusLabelMapping;

  public repeatGhostCount: number = 10;

  constructor(private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    if (!this.vouchers$) {
      this.vouchers$ = this.vouchersService.getAll().pipe(
        map(vouchers => (this.filter) ? vouchers.filter(v => this.filter.includes(v.state)) : vouchers));
    }
    this.originalVouchers$ = this.vouchers$;
  }

  public onClick(voucher: IVoucher): void {
    if (!this.canSelectRedeemed && voucher.state === 'redeemed') {
      return;
    }
    // tslint:disable-next-line: deprecation
    this.route.emit(voucher.id);

    this.tapped.emit(voucher);
  }
}
