import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IEngagementItemMenuOption } from '@cl-shared/components/engagement-item/engagement-item.component';

@Component({
  selector: 'cl-engagements-grid',
  templateUrl: './engagements-grid.component.html',
  styleUrls: ['./engagements-grid.component.scss']
})
export class EngagementsGridComponent {
  @Input() public dataSource: MatTableDataSource<IEngagement>;

  @Input() public menuOptions: IEngagementItemMenuOption[] = [];

  @Output() public menuTapped: EventEmitter<{ engagement: IEngagement, action: string }> = new EventEmitter();

  /**
   * Forward events
   */
  public menuOptTapped(event: { engagement: IEngagement, action: string }): void {
    this.menuTapped.emit(event);
  }
}
