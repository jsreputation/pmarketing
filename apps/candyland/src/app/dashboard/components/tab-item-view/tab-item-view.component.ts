import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-tab-item-view',
  templateUrl: './tab-item-view.component.html',
  styleUrls: ['./tab-item-view.component.scss']
})
export class TabItemViewComponent implements OnInit {
  @Input() public data: any;
  constructor() { }

  ngOnInit() {
  }

}
