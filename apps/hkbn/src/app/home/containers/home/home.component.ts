import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IReward } from '@perx/core';

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }
}
