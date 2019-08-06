import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss']
})
export class VoucherDetailComponent implements OnInit {
  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  public id: number;

  public onRedeem(): void {
    this.router.navigate(['redeem/pin/1']);
  }

  public ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      if (params.has('id')) {
        this.id = Number.parseInt(params.get('id'), 10);
      }
    });
  }
}
