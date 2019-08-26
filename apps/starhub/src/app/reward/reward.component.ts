import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IReward } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward: IReward;
  public rewardId: number;

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
}
