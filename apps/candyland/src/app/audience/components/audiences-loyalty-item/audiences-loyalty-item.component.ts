import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

export interface IEngagementItemMenuOption {
  action: string;
  label?: string;
}

@Component({
  selector: 'cl-audiences-loyalty-item',
  templateUrl: './audiences-loyalty-item.component.html',
  styleUrls: ['./audiences-loyalty-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesLoyaltyItemComponent {
  @Input() public data: any;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];
  @Output() public menuTapped: EventEmitter<{ action: string, payload: any }> = new EventEmitter();

  public tapped(option: IEngagementItemMenuOption): void {
    this.menuTapped.emit({action: option.action, payload: this.data});
  }
}
