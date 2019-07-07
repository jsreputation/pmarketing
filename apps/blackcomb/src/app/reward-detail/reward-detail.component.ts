import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {

  constructor(private router: Router) {}

  // TODO: Currently using this static voucher Id. Its needs to be replaced with id coming from VoucherService
  id = 140380;

  firstTime = true;

  ngOnInit() {
  }

  onRedeem() {
    this.router.navigate(['redeem/pin/1']);
  }

}
