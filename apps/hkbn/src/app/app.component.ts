import { Component, OnInit } from '@angular/core';
import { NotificationService, PopupComponent } from '@perx/core/dist/perx-core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'hkbn';

  constructor(private notificationService: NotificationService, private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, {data});
    });
  }
}
