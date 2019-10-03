import { Component, Input, OnInit } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
import { AuthService } from '@cl-core-services';
import { IamUser } from '@cl-core/http-adapters/iam-user';
import { UserService } from '@cl-core/services/user.service';
import { Observable } from 'rxjs';

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
        width: '170px'
      })),
      state('closed', style({
        width: '70px'
      })),
      fnTransition('open => closed', '.4s'),
      fnTransition('closed => open', '.3s')
    ]),
    trigger('position', [
      state('open', style({
        'margin-left': '170px'
      })),
      state('closed', style({
        'margin-left': '70px'
      })),
      fnTransition('open => closed', '.4s'),
      fnTransition('closed => open', '.3s')
    ])
  ]
})
export class SideNavComponent implements OnInit {
  @Input() public isVisible = true;
  public user$: Observable<IamUser>;
  public isOpen = true;
  public visibility = 'shown';
  public sideNavOpened = true;
  public sideNavMode = 'side';

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  public ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public logout(): void {
    this.authService.logout();
  }
}
