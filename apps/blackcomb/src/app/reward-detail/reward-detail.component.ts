import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {

  constructor(private router: Router) {}

  id = 140380; // TODO: Currently using this static voucher Id. Its needs to be replaced with id coming from VoucherService

  firstTime = true;

  ngOnInit() {
  }

  onRedeem() {
    this.router.navigate(['redeem/pin/1']);
  }

}
