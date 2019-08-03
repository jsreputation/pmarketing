import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent {

  constructor(private router: Router) {}

  public id: number = 140380; // TODO: Currently using this static voucher Id. Its needs to be replaced with id coming from VoucherService

  public firstTime: boolean = true;

  public onRedeem(): void {
    this.router.navigate(['redeem/pin/1']);
  }
}
