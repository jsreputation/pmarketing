import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { getEngagementRouterLink } from '@cl-helpers/get-engagement-router-link';

export interface IEngagementItemMenuOption {
  action: string;
  label: string;
}

@Component({
  selector: 'cl-loyalty-item',
  templateUrl: './loyalty-item.component.html',
  styleUrls: ['./loyalty-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyItemComponent {
  @Input() public data: IEngagement;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];
  @Input() public linkable: boolean = false;

  @Output() public menuTapped: EventEmitter<{ engagement: IEngagement, action: string }> = new EventEmitter();

  constructor(private router: Router) {
  }

  public tapped(option: IEngagementItemMenuOption): void {
    this.menuTapped.emit({action: option.action, engagement: this.data});
  }

  public navigateToEdit(): void {
    if (this.linkable) {
      const gameType = 'game_type' in this.data ? this.data.game_type : null;
      let path = getEngagementRouterLink(this.data.attributes_type, gameType);
      path += '/' + this.data.id;
      this.router.navigate([path]);
    }
  }
}
