import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {
  trigger, state, style, animate, transition
} from '@angular/animations';
// import { IamUser } from '@cl-core/http-adapters/iam-user';

export function fnTransition(stateChangeExpr: string, time: string): any {
  return transition(stateChangeExpr, [
    animate(time)
  ]);
}

@Component({
  selector: 'cs-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
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
export class SidenavComponent implements OnDestroy {
  @Input() public isVisible: boolean = true;
  // @Input() public user: IamUser;
  @Input() public user: any;
  public isOpen: boolean = true;
  public visibility: string = 'shown';
  public sideNavOpened: boolean = true;
  public mobileQuery: MediaQueryList;
  private myMobileQueryListener: () => void;
  @Output() public logout: EventEmitter<void> = new EventEmitter<void>();

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this.myMobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this.myMobileQueryListener);
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }

  public clickLogout(): void {
    this.logout.emit();
  }

  public ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this.myMobileQueryListener);
  }
}
