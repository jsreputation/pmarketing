import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface IEngagementItemMenuOption { action: string; label: string; }

@Component({
  selector: 'cl-engagement-item',
  templateUrl: './engagement-item.component.html',
  styleUrls: ['./engagement-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementItemComponent {
  @Input() public data: IEngagement;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];

  @Output() public menuTapped: EventEmitter<{ engagement: IEngagement, action: string }> = new EventEmitter();

  public tapped(option: IEngagementItemMenuOption): void {
    this.menuTapped.emit({ action: option.action, engagement: this.data });
  }
}
