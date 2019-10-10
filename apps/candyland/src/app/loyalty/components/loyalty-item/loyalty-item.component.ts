import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
  @Input() public data: any;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];
  @Input() public linkable: boolean = false;
  @Output() public menuTapped: EventEmitter<{ engagement: IEngagement, action: string }> = new EventEmitter();

  constructor(private router: Router) {
  }

  public tapped(option: IEngagementItemMenuOption): void {
    this.menuTapped.emit({action: option.action, engagement: this.data});
  }

  public navigateTo(): void {
    if (this.linkable) {
      this.router.navigate(['review/' + this.data.id]);
    }
  }

  public navigateToEdit(): void {
    if (this.linkable) {
      this.router.navigate(['edit/' + this.data.id]);
    }
  }
}
