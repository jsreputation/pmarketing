import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RewardsService, IReward, ProfileService, LoyaltyService, ILoyalty, IProfile } from '@perx/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {
  public reward: Observable<IReward>;

  public loyalty$: Observable<ILoyalty>;
  public pointsBalance: any;
  public userData: IProfile;
  public id: number;
  public loyaltyId: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rewardService: RewardsService,
    private profService: ProfileService,
    private loyaltyService: LoyaltyService
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
    this.profService.whoAmI().subscribe((res) => {
      this.userData = res;
    });
    this.loyaltyService.getLoyalties().subscribe((loyalties: ILoyalty[])=>{
      this.loyalty$ = this.loyaltyService.getLoyalty(loyalties[0].id);
    });
  }
  public moveToBooking(): void {
    this.router.navigate([`/detail/booking/${this.id}`]);
  }

}
