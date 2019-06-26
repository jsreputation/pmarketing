import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
