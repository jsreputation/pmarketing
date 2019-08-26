import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService, IReward } from '@perx/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public reward: Observable<IReward>;

  public id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rewardService: RewardsService,
  ) { }

  public ngOnInit(): void {
    this.reward = this.route.params.pipe(switchMap((param) => {
      this.id = param.id;
      return this.rewardService.getReward(this.id);
    })).pipe(map((val: IReward) => {
      if (val.description) {
        val.description = val.description + '<div><a href="faq">how to redem</a></div>';
      }
      return val;
    }));
  }
  public moveToBooking(): void {
    this.router.navigate([`/detail/booking/${this.id}`]);
  }

}
