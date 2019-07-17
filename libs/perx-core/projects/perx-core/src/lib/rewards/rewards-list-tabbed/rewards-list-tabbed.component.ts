import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

interface IReward {
  id: number;
}

@Component({
  selector: 'perx-core-rewards-list-tabbed',
  templateUrl: './rewards-list-tabbed.component.html',
  styleUrls: ['./rewards-list-tabbed.component.scss']
})
export class RewardsListTabbedComponent implements OnInit {
  @Input()
  rewards: Observable<IReward[]>;

  @Output()
  tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor() {
  }

  ngOnInit() {
  }

}
