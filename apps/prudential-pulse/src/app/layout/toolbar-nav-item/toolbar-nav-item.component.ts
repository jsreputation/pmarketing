/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'toolbar-nav-item',
  templateUrl: './toolbar-nav-item.component.html',
  styleUrls: ['./toolbar-nav-item.component.scss']
})
export class ToolbarNavItemComponent {

  @Input() routerLink: string[];
  @Input() label: string;
  @Input() activeImg: string;
  @Input() defaultImg: string;
  @Input() icon: string;
  @Input() ngClass: string | string[] | Set<string> | {
    [klass: string]: any;
  };

  constructor() { }
}
