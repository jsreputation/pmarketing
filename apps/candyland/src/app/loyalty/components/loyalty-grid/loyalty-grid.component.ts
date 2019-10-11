import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IEngagementItemMenuOption } from '@cl-shared/components/engagement-item/engagement-item.component';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-loyalty-grid',
  templateUrl: './loyalty-grid.component.html',
  styleUrls: ['./loyalty-grid.component.scss']
})
export class LoyaltyGridComponent {
  @Input() public dataSource: CustomDataSource<any>;

  @Input() public menuOptions: IEngagementItemMenuOption[] = [];

  @Output() public menuTapped: EventEmitter<{ engagement: IEngagement, action: string }> = new EventEmitter();

  /**
   * Forward events
   */
  public menuOptTapped(event: { engagement: IEngagement, action: string }): void {
    this.menuTapped.emit(event);
  }
}
