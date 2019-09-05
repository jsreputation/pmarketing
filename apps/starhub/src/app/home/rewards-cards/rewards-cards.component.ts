import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';
import { MacaronService } from '../../services/macaron.service';

@Component({
  selector: 'app-rewards-cards',
  templateUrl: './rewards-cards.component.html',
  styleUrls: ['./rewards-cards.component.scss']
})
export class RewardsCardsComponent implements OnInit {
  public rewards: Observable<IReward[]>;
  public macaronText: string;
  public macaronClass: string;
  public rewardBalance: number | null;
  public showMacaron: boolean = false;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor(
    private rewardsService: RewardsService,
    private macaronService: MacaronService
  ) {
  }

  public ngOnInit(): void {
    this.rewards = this.rewardsService.getAllRewards(['featured']);
  }

  public getMacaron(reward: IReward): void {
    const macaron = this.macaronService.getMacaron(reward);
    if (macaron === null) {
      return;
    }
    this.macaronText = macaron.label;
    this.macaronClass = macaron.class;
    this.rewardBalance = macaron.rewardBalance || null;
    this.showMacaron = true;
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }
}
