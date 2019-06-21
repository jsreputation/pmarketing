import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {
  private firstTime = false;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.firstTime = this.route.snapshot.paramMap.get('win') === 'true';
    this.id = this.route.snapshot.params.id;
  }

  onRedeem() {
    this.router.navigate([`/redemption/${this.id}`]);
  }
}
