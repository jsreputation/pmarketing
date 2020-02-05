import { Component, OnInit } from '@angular/core';
import { IVoucherService, Voucher } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public voucher$: Observable<Voucher>;

  constructor(
    private route: ActivatedRoute,
    private vouchersService: IVoucherService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.voucher$ = this.vouchersService.get(params.id);
    });
  }

}
