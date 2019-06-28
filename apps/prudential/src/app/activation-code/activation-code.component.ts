import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { IPopupConfig, PopupComponent } from '@perx/core/dist/perx-core';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-activation-code',
  templateUrl: './activation-code.component.html',
  styleUrls: ['./activation-code.component.scss'],
  animations: [
    trigger('hideAnim', [
      transition(':enter', [style({
        bottom: '-100%',
      }),
        animate('500ms ease-in-out', style({
          bottom: '0',
        })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({
          bottom: '-100%',
        }))
      ])
    ]),
  ],
})
export class ActivationCodeComponent {

  hideActionContainer = false;

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
    goToLoginDialog.afterClosed().subscribe(() => { this.router.navigate(['/login']); });
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

  isPinFocused(pinFocused: boolean) {
    this.hideActionContainer = pinFocused;
  }
}
