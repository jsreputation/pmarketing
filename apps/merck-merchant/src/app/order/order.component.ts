import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RewardsService, IReward } from '../services/rewards.service';
import { NotificationService } from '@perx/core';

export interface IPayload {
  name: string;
  id: string;
}

interface Product {
  qty: number;
  index: number;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public payload: IPayload;
  public rewards: IReward[];
  public isSummaryActivated: boolean = false;
  public selectedRewards: IReward[];
  public totalPoints: number;

  constructor(
    private router: Router,
    private rewardsService: RewardsService,
    private notificationService: NotificationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if ( !navigation.extras.state ) {
      return;
    }
    const state = navigation.extras.state.data;
    this.payload = JSON.parse(state);
  }

  public ngOnInit(): void {
    this.rewardsService.getRewards().subscribe(res => this.rewards = res);
  }

  public newQuantity(newData: Product): void {
    this.rewards[newData.index].quantity = newData.qty;
  }

  private checkUpdatedRewards(): void {
    this.selectedRewards = this.rewards.filter(reward => reward.quantity > 0);
    this.totalPoints = this.selectedRewards.reduce((sum, current) =>  sum + current.quantity  * current.pointsPerUnit, 0);
  }

  public toggleSummary(): void {
    this.checkUpdatedRewards();
    this.isSummaryActivated = !this.isSummaryActivated;
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

  public onCompleteTransaction(): void {
    // Call api TBD https://perxtechnologies.atlassian.net/browse/PW-483
    this.notificationService.addSnack('Transaction completed'),
    this.router.navigate(['/home']);
  }
}
