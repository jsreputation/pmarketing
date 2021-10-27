import { Component } from '@angular/core';
import { IReward, RewardsService } from '@perxtech/core';
import { Observable } from 'rxjs';
import { IPosition } from './map/map.component';

@Component({
  selector: 'bdo-nearby-deals',
  templateUrl: './nearby-deals.component.html',
  styleUrls: ['./nearby-deals.component.scss']
})
export class NearbyDealsComponent {
  public rewards:IReward[];
  public rad = 10000;
  public currentPosition: IPosition;
  constructor(
    private rewardService: RewardsService
  ) {
    this.currentPosition = {
      lat: 14.560446,
      lng: 121.017646,
    };
  }

  ngOnInit(): void {
    this.getRewardNearBy(this.rad,this.currentPosition.lat, this.currentPosition.lng).subscribe(rewards=>{
      this.rewards = rewards;
    });
  }

  selectedItem(item: IReward) {
    console.log(item);
  }

  getRewardNearBy(
    rad: number,
    lat?: number,
    lng?: number
  ): Observable<IReward[]> {
    return this.rewardService.nearMe(rad, lat, lng);
  }
}
