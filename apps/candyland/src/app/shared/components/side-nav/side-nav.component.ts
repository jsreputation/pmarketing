import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() isVisible = true;
  visibility = 'shown';

  sideNavOpened: boolean = true;
  matDrawerOpened: boolean = false;
  matDrawerShow: boolean = true;
  sideNavMode: string = 'side';
  constructor() { }

  ngOnInit() {
  }

  public toggleSideNav(): void {
    this.sideNavOpened = !this.sideNavOpened;
    this.matDrawerOpened = !this.matDrawerOpened;
  }

}
