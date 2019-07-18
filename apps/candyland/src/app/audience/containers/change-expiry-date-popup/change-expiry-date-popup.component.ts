import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-change-expiry-date-popup',
  templateUrl: './change-expiry-date-popup.component.html',
  styleUrls: ['./change-expiry-date-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeExpiryDatePopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
