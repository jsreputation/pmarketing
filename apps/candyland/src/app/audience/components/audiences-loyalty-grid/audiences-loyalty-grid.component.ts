import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IEngagementItemMenuOption } from '@cl-shared/components/engagement-item/engagement-item.component';
import { CustomDataSource } from '@cl-shared/table';

@Component({
  selector: 'cl-audiences-loyalty-grid',
  templateUrl: './audiences-loyalty-grid.component.html',
  styleUrls: ['./audiences-loyalty-grid.component.scss']
})
export class AudiencesLoyaltyGridComponent {
  @Input() public dataSource: CustomDataSource<any>;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];
  @Output() public menuTapped: EventEmitter<{ payload: any, action: string }> = new EventEmitter();

  /**
   * Forward events
   */
  public menuOptTapped(event: { payload: any, action: string }): void {
    this.menuTapped.emit(event);
  }
}
