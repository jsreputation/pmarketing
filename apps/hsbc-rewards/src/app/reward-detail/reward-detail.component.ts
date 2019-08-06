import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RewardsService, IReward, ProfileService } from '@perx/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  reward : Observable<IReward>;
  userData;
  constructor(
    private router: ActivatedRoute,
    private rewardService: RewardsService,
    private profService: ProfileService
  ) { }

  ngOnInit() {
    this.reward = this.router.params.pipe(switchMap((param)=>{
      return this.rewardService.getReward(param.id);
    }))
    this.profService.whoAmI().subscribe((res)=>{
      this.userData = res;
    })
    
  }

}
