import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  public voucherId: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      this.voucherId = parseInt(params.get('id'), 10);
    });
  }

  onRedeem(id: string): void {
    this.router.navigate([`/activation/${id}`]);
  }
}
