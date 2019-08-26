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
    this.originalVouchers$ = vouchers;
  };
  public get vouchers$(): Observable<IVoucher[]> {
    return this.originalVouchers$;
  };

  @Input() public set filter(filter: string[]) {
    this._filter = filter;
    this.originalVouchers$ = this.filterVoucher(this.originalVouchers$);
  }
  public get filter(): string[] {
    return this._filter;
  }
  private _filter: string[];
  private originalVouchers$: Observable<IVoucher[]>;
  @Input()
  public mapping: StatusLabelMapping;

  public repeatGhostCount: number = 10;

  constructor(private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    if (!this.vouchers$) {
      this.originalVouchers$ = this.vouchersService.getAll();
    }
  }

  public onClick(voucher: IVoucher): void {
    if (!this.canSelectRedeemed && voucher.state === 'redeemed') {
      return;
    }
    // tslint:disable-next-line: deprecation
    this.route.emit(voucher.id);

    this.tapped.emit(voucher);
  }

  private filterVoucher(vouchers: Observable<IVoucher[]>): Observable<IVoucher[]> {
    return vouchers.pipe(map(voucher => voucher.filter((el) => this.filter.includes(el.state))));
  }
}
