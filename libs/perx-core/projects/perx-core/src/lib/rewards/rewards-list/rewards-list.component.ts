import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../models/reward.model';

@Component({
  selector: 'perx-core-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss']
})
export class RewardsListComponent implements OnInit {

  public repeatGhostCount: number = 10;

  @Input('rewardsList')
  public rewards$: Observable<IReward[]>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  // constructor() {
  // }

  public ngOnInit(): void {
  }

  public rewardClickedHandler(reward: IReward): void {
    this.tapped.emit(reward);
  }
}
