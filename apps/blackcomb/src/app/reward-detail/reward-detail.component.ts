import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
  }

  redeemClicked() {
    this.router.navigate(['redeem/pin/1']);
  }
}
