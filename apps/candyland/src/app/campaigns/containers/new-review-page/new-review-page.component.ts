import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-new-review-page',
  templateUrl: './new-review-page.component.html',
  styleUrls: ['./new-review-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewReviewPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
