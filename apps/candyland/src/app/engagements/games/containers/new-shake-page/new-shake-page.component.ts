import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-new-shake-page',
  templateUrl: './new-shake-page.component.html',
  styleUrls: ['./new-shake-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewShakePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
