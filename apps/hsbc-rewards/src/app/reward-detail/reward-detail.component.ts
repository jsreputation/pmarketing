import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RewardsService } from '@perx/core';

@Component({
  selector: 'app-reward-detail',
  templateUrl: './reward-detail.component.html',
  styleUrls: ['./reward-detail.component.scss']
})
export class RewardDetailComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private rewardService: RewardsService
  ) { }

  ngOnInit() {
    this.router.params.subscribe((val) => {
      console.log(val);
      this.rewardService.getReward(1).subscribe((va) => {
        console.log(val);
      });
    })
    this.rewardService.getAllRewards().subscribe((val) => {
      console.log(val);
    })
  }

}
