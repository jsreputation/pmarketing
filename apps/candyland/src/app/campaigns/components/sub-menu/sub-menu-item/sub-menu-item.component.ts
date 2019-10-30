import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-sub-menu-item',
  templateUrl: './sub-menu-item.component.html',
  styleUrls: ['./sub-menu-item.component.scss']
})
export class SubMenuItemComponent implements OnInit {
  @Input() public title: string;
  @Input() public count: any;
  @Input() public activeItem: string;
  constructor() { }

  ngOnInit() {
  }

}
