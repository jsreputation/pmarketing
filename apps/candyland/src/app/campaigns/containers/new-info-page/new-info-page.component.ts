import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-new-info-page',
  templateUrl: './new-info-page.component.html',
  styleUrls: ['./new-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewInfoPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
