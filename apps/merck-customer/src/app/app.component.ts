import { Component } from '@angular/core';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { EnterPinComponent } from './enter-pin/enter-pin.component';
import { HomeComponent } from './home/home.component';
import { FindPharmacyComponent } from './find-pharmacy/find-pharmacy.component';
import { NotificationService } from '@perx/core/dist/perx-core';
import { MatSnackBar } from '@angular/material';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public showHeader: boolean = false;

  constructor(private notificationService: NotificationService, private snackBar: MatSnackBar) {
    this.notificationService.$snack.subscribe((message: string) => {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message,
          icon: 'clear',
        },
      });
    });
  }

  public onActivate(ref: any): void {
    this.showHeader =
      ref instanceof ForgotPasswordComponent ||
      ref instanceof EnterPinComponent ||
      ref instanceof HomeComponent ||
      ref instanceof FindPharmacyComponent;
  }
}
