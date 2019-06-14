import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupComponent, IPopupConfig } from '@perx/core/dist/perx-core';
import { MatDialog } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public datePipe: DatePipe
  ) { }

  ngOnInit() {
  }

  onRoute(id: string) {
    this.router.navigate([`/vouchers/${id}`]);
  }

  completedPopup() {
    const data: IPopupConfig = {
      text: 'See the treats you\'ve earned and don\'t forget to redeem them before they\'re gone!',
      title: 'You\'ve already completed the game',
      buttonTxt: 'See my treats'
    };
    this.dialog.open(PopupComponent, { data });
  }

  expiredPopup(date: Date = null) {
    const text = date === null ? 'This campaign has ended' : `This campaign has ended on ${this.datePipe.transform(date, 'mediumDate')}`;
    const data: IPopupConfig = {
      text,
      title: 'We\'re sorry, the treats have expired'
    };
    this.dialog.open(PopupComponent, { data });
  }
}
