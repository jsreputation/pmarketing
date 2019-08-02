import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RewardsService, IReward } from '../services/rewards.service';

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

  constructor(private router: Router, private rewardsService: RewardsService) {
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

  public onNext(): void {
    console.log(this.rewards);
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }
}
