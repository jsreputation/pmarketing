import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'cl-sidenave-menu-item',
  templateUrl: './sidenave-menu-item.component.html',
  styleUrls: ['./sidenave-menu-item.component.scss'],
animations: [
  trigger('openClose', [
    state('open', style({
      width: 'auto',
    })),
    state('closed', style({
      width: '0',
    })),
    transition('open <=> closed', [
      animate('.4s')
    ]),
    transition('open => *', [
      animate('.4s')
    ])
  ]),
]
})
export class SidenaveMenuItemComponent implements OnInit {
  @Input() menu;
  @Input() isOpen: boolean;
  @Input() secondaryMenu = false;
  constructor() { }

  ngOnInit() {
  }

  public openLink(): void {
    this.menu.open = !this.menu.open;
  }

  public checkForChildMenu(): boolean {
    return this.menu && this.menu.sub;
  }

}
