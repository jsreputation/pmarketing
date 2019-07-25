import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IReward } from '../models/reward.model';

@Component({
  selector: 'perx-core-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('reward')
  public reward$: Observable<IReward>;

  public ngOnInit(): void {
  }

}
