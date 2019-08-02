import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@perx/core';

@Component({
  selector: 'app-pin-input',
  templateUrl: './pin-input.component.html',
  styleUrls: ['./pin-input.component.scss']
})
export class PinInputComponent implements OnInit {

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  validate(code: string) {
    this.notificationService.addPopup({
      title: 'Pin Code result:',
      text: code
    });
  }
}
