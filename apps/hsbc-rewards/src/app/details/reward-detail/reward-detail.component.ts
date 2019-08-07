import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService, IReward, ProfileService, LoyaltyService } from '@perx/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  reward : Observable<IReward>;
  loyalty;
  pointsBalance;
  userData;
  id:number;
  loyaltyId = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rewardService: RewardsService,
    private profService: ProfileService,
    private loyaltyService: LoyaltyService
  ) { }

  ngOnInit() {
    this.reward = this.route.params.pipe(switchMap((param)=>{
      this.id = param.id
      return this.rewardService.getReward(this.id);
    }))
    this.profService.whoAmI().subscribe((res)=>{
      this.userData = res;
    })
    this.loyaltyService.getLoyalty(this.loyaltyId).subscribe((res)=>{
      this.loyalty = res;
    }, (err)=>{
      this.pointsBalance = Math.random() > 0.5 ? {
        sufficientPoints: 100
      } : {
        insufficientPoints: 100
      };
    })
  }
  moveToBooking() {
    this.router.navigate([`/detail/booking/${this.id}`]);
  }
}
