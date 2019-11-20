import { Component, Input, EventEmitter, Output } from '@angular/core';
import { IEngagementItemMenuOption } from '@cl-shared/components/engagement-item/engagement-item.component';
import { CustomDataSource } from '@cl-shared/table';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { StatusLabelConfig } from '@cl-shared';

@Component({
  selector: 'cl-loyalty-grid',
  templateUrl: './loyalty-grid.component.html',
  styleUrls: ['./loyalty-grid.component.scss']
})
export class LoyaltyGridComponent {
  @Input() public dataSource: CustomDataSource<ILoyaltyForm>;
  @Input() public menuOptions: IEngagementItemMenuOption[] = [];
  @Input() public statusLabel: { [key: string]: StatusLabelConfig };
  @Output() public menuTapped: EventEmitter<{ loyalty: ILoyaltyForm, action: string }> = new EventEmitter();

  /**
   * Forward events
   */
  public menuOptTapped(event: { loyalty: ILoyaltyForm, action: string }): void {
    this.menuTapped.emit(event);
  }
}
