import { Component, Input, OnInit } from '@angular/core';
import {
  trigger, state, style, animate, transition, query, stagger,
} from '@angular/animations';

export function fnTransition(stateChangeExpr, time) {
  return transition(stateChangeExpr, [
    animate(time)
  ]);
}
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
      fnTransition('open => closed', '.4s'),
      fnTransition('closed => open', '.3s'),
    ]),
    trigger('position', [
      state('open', style({
        'margin-left': '170px',
      })),
      state('closed', style({
        'margin-left': '70px',
      })),
      fnTransition('open => closed', '.4s'),
      fnTransition('closed => open', '.3s'),
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
