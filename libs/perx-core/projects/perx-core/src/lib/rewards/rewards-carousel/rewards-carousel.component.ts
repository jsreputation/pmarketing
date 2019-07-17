import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../models/reward.model';

@Component({
  selector: 'perx-core-rewards-carousel',
  templateUrl: './rewards-carousel.component.html',
  styleUrls: ['./rewards-carousel.component.scss']
})
export class RewardsCarouselComponent implements OnInit {

  @Input()
  public rewards: Observable<IReward[]>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  // constructor() {
  // }

  public ngOnInit(): void {
  }

}
