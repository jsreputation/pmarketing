import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-add-user-popup',
  templateUrl: './add-user-popup.component.html',
  styleUrls: ['./add-user-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserPopupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
