import { Component, OnInit } from '@angular/core';
import { RewardsService, IReward } from '@perx/core';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * @deprecated
 */
@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
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
