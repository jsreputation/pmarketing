import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { VouchersService, Voucher } from '@perx/core';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: VouchersService
  ) { }

  public voucher: Observable<Voucher>;

  public onRedeem(): void {
    this.voucher.subscribe((v: Voucher) => {
      this.router.navigate(['redeem'], { queryParams: { id: v.id } });
    });
  }

  public ngOnInit(): void {
    this.voucher = this.activeRoute.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN: number = Number.parseInt(id, 10);
          return this.vouchersService.get(idN);
        })
      );
  }
}
