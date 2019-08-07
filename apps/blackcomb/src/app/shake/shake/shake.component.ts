import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService,
} from '@perx/core';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent {
  public title: string = 'Tap the Tree!';
  public subTitle: string = 'Tap the tree and win rewards';
  public gameType: string = 'shake-tree';
  public gameId: number;
  public isEnabled: boolean = false;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private notificationService: NotificationService
  ) { }

  public gameCompleted(): void {
    setTimeout(() => {
      this.router.navigate(['/wallet']);
      this.notificationService.addPopup({
        title: 'Congratulations!',
        text: this.congratsDetailText,
        buttonTxt: 'View Rewards',
        imageUrl: 'assets/congrats_image.png',
      });
    }, 2000);
  }
}
