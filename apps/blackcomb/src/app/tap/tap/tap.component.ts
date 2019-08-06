import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService
} from '@perx/core';

@Component({
  selector: 'app-tap',
  templateUrl: './tap.component.html',
  styleUrls: ['./tap.component.scss']
})
export class TapComponent {
  public title: string = 'Hit the Pinata!';
  public subTitle: string = 'Hit the Pinata and win rewards';
  public gameType: string = 'pinata';

  public gameId: number;

  public isEnabled: boolean = false;

  // Pinata static Values
  public pinataTotalTaps: number = 2;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  public gameCompleted(): void {
    setTimeout(() => {
      this.router.navigate(['home/']);
      this.notificationService.addPopup({
        title: 'Congratulations!',
        text: this.congratsDetailText,
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png',
      });
    }, 2000);
  }
}
