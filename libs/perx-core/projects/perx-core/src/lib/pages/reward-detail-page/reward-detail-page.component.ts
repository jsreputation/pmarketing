import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../../rewards/models/reward.model';
import { RewardsService } from '../../rewards/rewards.service';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'perx-core-reward-detail-page',
  templateUrl: './reward-detail-page.component.html',
  styleUrls: ['./reward-detail-page.component.scss']
})
export class RewardDetailPageComponent implements OnInit {

  public reward$: Observable<IReward>;

  constructor(
    private rewardsService: RewardsService,
    private activeRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.reward$ = this.activeRoute.queryParams
      .pipe(
        filter((ps: Params) => ps.id),
        map((ps: Params) => Number.parseInt(ps.id, 10)),
        switchMap((id: number) => this.rewardsService.getReward(id))
      );
  }

}
