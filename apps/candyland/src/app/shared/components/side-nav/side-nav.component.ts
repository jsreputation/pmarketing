import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, Input, OnInit } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
import { AuthService } from '@cl-core-services';
import { UserService } from '@cl-core/services/user.service';
import { Observable } from 'rxjs';

export function fnTransition(stateChangeExpr: string, time: string): any {
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
export class SideNavComponent implements OnInit, OnDestroy {
  @Input() public isVisible: boolean = true;
  public user$: Observable<IAMUser>;
  public isOpen: boolean = true;
  public visibility: string = 'shown';
  public sideNavOpened: boolean = true;
  public mobileQuery: MediaQueryList;
  private myMobileQueryListener: () => void;

  constructor(private authService: AuthService,
              private userService: UserService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
                this.mobileQuery = media.matchMedia('(max-width: 768px)');
                this.myMobileQueryListener = () => changeDetectorRef.detectChanges();
                // tslint:disable-next-line: deprecation
                this.mobileQuery.addListener(this.myMobileQueryListener);
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

  public ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.myMobileQueryListener);
  }
}
