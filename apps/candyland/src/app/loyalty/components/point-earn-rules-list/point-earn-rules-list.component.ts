import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';

@Component({
  selector: 'cl-point-earn-rules-list',
  templateUrl: './point-earn-rules-list.component.html',
  styleUrls: ['./point-earn-rules-list.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class PointEarnRulesListComponent {
  @Input() public editable: boolean = false;
  // @Input() public dataSource: any;
  @Input() public ruleSet: any;
  @Input() public displayedColumns: string[] = ['priority', 'name', 'conditions']; // 'pointsEarned'];
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  // @ViewChild('table', {static: false}) public table: MatTable<any>;
  public get rules(): any[] {
    return this.ruleSet.rules || null;
  }

  public get displayedColumnsWithEdit(): string[] {
    if (this.editable) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }

  public editItem(rule: any): void {
    this.rulesAction.emit({action: NewLoyaltyActions.editRule, data: {ruleSet: this.ruleSet, rule}});
  }

  public duplicateItem(rule: any): void {
    this.rulesAction.emit({action: NewLoyaltyActions.duplicateRule, data: {ruleSet: this.ruleSet, rule}});
  }

  public deleteItem(rule: any): void {
    this.rulesAction.emit({action: NewLoyaltyActions.deleteRule, data: {ruleSet: this.ruleSet, rule}});
  }

  public dropTable(event: CdkDragDrop<any>): void {
    const prevIndex = this.rules.findIndex((d) => d === event.item.data);
    this.rulesAction.emit({
      action: NewLoyaltyActions.dropRule,
      data: {ruleSet: this.ruleSet, prevIndex, currentIndex: event.currentIndex}
    });
  }
}
