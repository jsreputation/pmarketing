import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PopupComponent, IPopupConfig } from '@perx/core/dist/perx-core';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';

export enum POPUP_TYPE {
  completed = 'completed',
  expired = 'expired',
  four0four = '404'
}
@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(ps => {
      const popup = ps.get('popup');
      switch (popup) {
        case POPUP_TYPE.completed:
          this.completedPopup();
          break;
        case POPUP_TYPE.expired:
          this.expiredPopup();
          break;
        case POPUP_TYPE.four0four:
          this._404Popup();
          break;
      }
    });
  }

  onRoute(id: string): void {
    this.router.navigate([`/vouchers/${id}`]);
  }

  completedPopup(): void {
    this.popup({
      text: 'See the treats you\'ve earned and don\'t forget to redeem them before they\'re gone!',
      title: 'You\'ve already completed the game',
      buttonTxt: 'See my treats'
    });
  }

  expiredPopup(date: Date = null): void {
    const text = date === null ? 'This campaign has ended' : `This campaign has ended on ${this.datePipe.transform(date, 'mediumDate')}`;
    this.popup({
      text,
      title: 'We\'re sorry, the treats have expired'
    });
  }
  _404Popup(): void {
    this.popup({
      title: 'What you are looking for does not exist'
    });
  }

  popup(data: IPopupConfig): void {
    this.dialog
      .open(PopupComponent, { data })
      .afterClosed()
      .subscribe(() => this.router.navigate(['/vouchers']));
  }
}
