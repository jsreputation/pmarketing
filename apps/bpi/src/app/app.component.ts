import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bpi';

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      console.log(data);
      this.dialog.open(PopupComponent, { data });
    });
  }
}
