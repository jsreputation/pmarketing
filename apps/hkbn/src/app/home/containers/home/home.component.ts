import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, LoyaltyService } from '@perx/core';

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private loyaltyService: LoyaltyService) {
  }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalties().subscribe((v) => {
      console.log(v);
    });
  }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }
}
