import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'cl-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        width: '170px',
      })),
      state('closed', style({
        width: '70px',
      })),
      transition('open <=> closed', [
        animate('.4s')
      ])
    ]),
  ]
})
export class SideNavComponent implements OnInit {
  @Input() isVisible = true;
  public isOpen = true;
  public visibility = 'shown';
  public sideNavOpened = true;
  public sideNavMode = 'side';
  constructor() { }

  ngOnInit() {
  }


  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

}
