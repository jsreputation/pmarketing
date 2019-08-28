import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public rewardId: number;
  public isButtonDisabled: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(
      ((params: Params) => {
      if (params.id) {
        this.rewardId = params.id;
      }
    }));
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.router.navigate(['/home/vouchers']);
  }

  public setToExpired(isExpired: boolean): void {
    this.isButtonDisabled = isExpired;
  }
}
