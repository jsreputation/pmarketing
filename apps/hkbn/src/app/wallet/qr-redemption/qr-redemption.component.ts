import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'hkbn-qr-redemption',
  templateUrl: './qr-redemption.component.html',
  styleUrls: ['./qr-redemption.component.scss']
})
export class QrRedemptionComponent implements OnInit {

  public voucherId: number;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute) {
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

}
