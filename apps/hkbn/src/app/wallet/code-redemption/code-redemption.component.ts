import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { VouchersService } from '@perx/core/dist/perx-core';

@Component({
  selector: 'hkbn-code-redemption',
  templateUrl: './code-redemption.component.html',
  styleUrls: ['./code-redemption.component.scss']
})
export class CodeRedemptionComponent implements OnInit {

  public voucherId: number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private vouchersService: VouchersService) {
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((params: ParamMap) => {
        this.voucherId = parseInt(params.get('id'), 10);
      });
  }

  public redeem(): void {
    this.vouchersService.redeemVoucher(this.voucherId).subscribe(() => {
    });
  }

}
