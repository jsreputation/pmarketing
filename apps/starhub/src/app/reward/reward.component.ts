import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { IReward, RewardsService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward: IReward;

  constructor(
    private location: Location,
    private router: Router,
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.rewardsService.getReward(id))
      )
      .subscribe((reward: IReward) => this.reward = reward);
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.router.navigate(['/home/vouchers']);
  }
}
