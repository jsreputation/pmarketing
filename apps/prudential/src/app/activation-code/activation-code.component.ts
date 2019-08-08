import { MatDialog, MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IPopupConfig, PopupComponent } from '@perx/core';
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
export class ActivationCodeComponent implements OnInit {
  public voucherId: number;
  public hideActionContainer: boolean = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.voucherId = parseInt(params.get('id'), 10);
    });
  }

  public pinInputSuccess(): void {
    this.router.navigate([`/redemption/${this.voucherId}`]);
  }

  public onCancel(): void {
    this.location.back();
  }

  public errorHandler(status: number): void {
    if (status === 401) {
      this.needLoginPopup();
    } else {
      this.errorPopup();
    }
  }

  public needLoginPopup(): void {
    const goToLoginDialog = this.popup({
      title: 'You need to login to redeem the voucher',
      buttonTxt: 'Go to login'
    });
    goToLoginDialog.afterClosed().subscribe(() => { this.router.navigate(['/login']); });
  }

  public errorPopup(): void {
    this.popup({
      title: 'Error occur, please try again later'
    });
  }

  public popup(data: IPopupConfig): MatDialogRef<PopupComponent> {
    return this.dialog
      .open(PopupComponent, { data });
  }

  public isPinFocused(pinFocused: boolean): void {
    this.hideActionContainer = pinFocused;
  }
}
