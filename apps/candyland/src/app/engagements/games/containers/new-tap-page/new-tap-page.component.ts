import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-new-tap-page',
  templateUrl: './new-tap-page.component.html',
  styleUrls: ['./new-tap-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTapPageComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

}
