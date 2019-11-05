import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { ICustomTireForm } from '@cl-core/models/loyalty/loyalty-form.model';

@Component({
  selector: 'cl-point-earn-rules-list',
  templateUrl: './point-earn-rules-list.component.html',
  styleUrls: ['./point-earn-rules-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PointEarnRulesListComponent {
  @Input() public editable: boolean = false;
  @Input() public dataSource: any;
  @Input() public tier: any;
  @Input() public displayedColumns: string[] = ['priority', 'name', 'conditions', 'pointsEarned'];
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: ICustomTireForm }> = new EventEmitter();
  @ViewChild('table', {static: false}) public table: MatTable<any>;

  public get displayedColumnsWithEdit(): string[] {
    if (this.editable) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }

  public editItem(rule: ICustomTireForm): void {
    this.rulesAction.emit({action: NewLoyaltyActions.editRule, data: rule});
  }

  public duplicateItem(rule: ICustomTireForm): void {
    this.rulesAction.emit({action: NewLoyaltyActions.duplicateRule, data: rule});
  }

  public deleteItem(rule: ICustomTireForm): void {
    this.rulesAction.emit({action: NewLoyaltyActions.deleteRule, data: rule});
  }

  // public dropTable(event: CdkDragDrop<any>): void {
  //
  // }

  public dropTable(event: CdkDragDrop<any>): void {
    const prevIndex = this.dataSource.findIndex((d) => d === event.item.data);
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.dataSource.map((item, index) => item.priority = (index + 1).toString());
    this.table.renderRows();
    // this.rulesAction.emit({action: NewLoyaltyActions.dropRule, data: rule});
  }
}
