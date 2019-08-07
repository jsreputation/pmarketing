import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../models/reward.model';

@Component({
  selector: 'perx-core-rewards-collection',
  templateUrl: './rewards-collection.component.html',
  styleUrls: ['./rewards-collection.component.scss']
})
export class RewardsCollectionComponent implements OnInit {

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  // constructor() {
  // }

  public ngOnInit(): void {
  }

  public rewardClicked(reward: IReward): void {
    this.tapped.emit(reward);
  }

}
