import { Component } from '@angular/core';
import { NotificationService } from '@perx/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  constructor(private notificationService: NotificationService) { }
  public pop(): void {
    this.notificationService.addPopup({
      // tslint:disable-next-line: max-line-length
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      title: 'Lorem ipsum dolor sit amet',
      buttonTxt: 'Lorem ipsum'
    });
  }
}
