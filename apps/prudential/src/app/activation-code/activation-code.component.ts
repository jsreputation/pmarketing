import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { IPopupConfig, PopupComponent } from '@perx/core/dist/perx-core';


@Component({
  selector: 'app-activation-code',
  templateUrl: './activation-code.component.html',
  styleUrls: ['./activation-code.component.scss']
})
export class ActivationCodeComponent {

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private location: Location
  ) {
  }

  pinInputSuccess(id: string): void {
    this.router.navigate([`/redemption/${id}`]);
  }

  onCancel() {
    this.location.back();
  }

  errorHandler(status: number) {
    if (status === 401) {
      this.needLoginPopup();
    } else {
      this.errorPopup();
    }
  }
  needLoginPopup(): void {
    const goToLoginDialog = this.popup({
      title: 'You need to login to reddem the voucher',
      buttonTxt: 'Go to login'
    });
    // goToLoginDialog.afterClosed().subscribe(() => { this.router.navigate(['/login']); });
  }

  errorPopup(): void {
    this.popup({
      title: 'Error occur, please try again later'
    });
  }

  popup(data: IPopupConfig) {
    return this.dialog
      .open(PopupComponent, { data });
  }

}
