import { Component } from '@angular/core';
import { NotificationService } from '@perx/core/dist/perx-core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'merck-merchant';

  constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {
    this.notificationService.$message.subscribe((message: string) => {
      this.snackBar.open(message, 'Dismiss', {
        duration: 5000,
      });
    });
  }
}
