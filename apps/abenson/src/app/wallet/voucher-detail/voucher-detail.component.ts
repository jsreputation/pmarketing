import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IVoucherService, Voucher } from '@perxtech/core';
import { filter, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private vouchersService: IVoucherService
  ) { }

  public voucher$: Observable<Voucher>;

  public ngOnInit(): void {
    this.voucher$ = this.activeRoute.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string | null = params.get('id');
          if (!id) {
            return throwError({ message: 'voucher id is required' });
          }
          const idN: number = Number.parseInt(id, 10);
          return this.vouchersService.get(idN);
        })
      );
  }

  public onRedeem(): void {
    this.voucher$.subscribe((v: Voucher) => {
      this.router.navigate(['redeem', v.id]);
    });
  }
}
