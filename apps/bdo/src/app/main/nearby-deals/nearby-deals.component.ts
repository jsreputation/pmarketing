import { Component } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { Observable } from 'rxjs';
import { IPosition } from './map/map.component';
@Component({
  selector: 'bdo-nearby-deals',
  templateUrl: './nearby-deals.component.html',
  styleUrls: ['./nearby-deals.component.scss'],
})
export class NearbyDealsComponent {
  public rewards: IReward[];
  public rad = 10000;
  public currentPosition: IPosition;
  constructor(private rewardService: RewardsService) {}

  ngOnInit(): void {
    this.getRewardNearBy()
  }

  selectedItem(item: IReward) {
    console.log(item);
  }

  getRewardNearBy() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(this.currentPosition)
        this.rewardService
          .nearMe(this.rad, this.currentPosition.lat, this.currentPosition.lng)
          .subscribe((rewards) => {
            this.rewards = rewards;
          });
      });
    }
  }
}
