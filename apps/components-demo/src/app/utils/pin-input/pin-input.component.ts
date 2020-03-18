import { Component } from '@angular/core';
import { NotificationService } from '@perxtech/core';

@Component({
  selector: 'app-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss']
})
export class PinInputComponent {

  constructor(private notificationService: NotificationService) {
  }

  public validate(code: string): void {
    this.notificationService.addPopup({
      title: 'Pin Code result:',
      text: code
    });
  }
}
