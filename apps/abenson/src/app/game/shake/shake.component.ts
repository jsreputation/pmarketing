import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  NotificationService,
  IGame
} from '@perx/core';

@Component({
  selector: 'app-shake',
  templateUrl: './shake.component.html',
  styleUrls: ['./shake.component.scss']
})
export class ShakeComponent implements OnInit {
  @Input() public game: IGame;
  public isEnabled: boolean = false;

  public congratsDetailText: string = 'You just won 2 rewards';

  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
   
    if (this.game.remainingNumberOfTries <= 0) {
      this.router.navigate(['/wallet']);
    }
  }

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
