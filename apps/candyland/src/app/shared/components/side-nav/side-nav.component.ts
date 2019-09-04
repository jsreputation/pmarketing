import { Component, Input } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
import { AuthService } from '@cl-core-services';

export function fnTransition(stateChangeExpr, time): any {
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
export class SideNavComponent {
  constructor(private authService: AuthService) { }
  @Input() public isVisible = true;
  public isOpen = true;
  public visibility = 'shown';
  public sideNavOpened = true;
  public sideNavMode = 'side';

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public logout(): void {
    this.authService.logout();
  }
}
