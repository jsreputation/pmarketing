import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { ILoyaltyRule, ILoyaltyRuleSet } from '@cl-core/models/loyalty/loyalty-rules.model';

@Component({
  selector: 'cl-point-earn-rules-list',
  templateUrl: './point-earn-rules-list.component.html',
  styleUrls: ['./point-earn-rules-list.component.scss'],
  // encapsulation: ViewEncapsulation.None
})
export class PointEarnRulesListComponent {
  @Input() public editable: boolean = false;
  @Input() public ruleSet: ILoyaltyRuleSet;
  @Input() public displayedColumns: string[] = ['priority', 'name', 'conditions', 'pointsEarned'];
  @Output() public rulesAction: EventEmitter<{ action: NewLoyaltyActions, data?: any }> = new EventEmitter();

  public get rules(): ILoyaltyRule[] {
    return this.ruleSet.rules || null;
  }

  public get displayedColumnsWithEdit(): string[] {
    if (this.editable) {
      return [...this.displayedColumns, 'actions'];
    }
    return this.displayedColumns;
  }

  public editItem(rule: ILoyaltyRule): void {
    this.rulesAction.emit({action: NewLoyaltyActions.editRule, data: {ruleSet: this.ruleSet, rule}});
  }

  public duplicateItem(rule: ILoyaltyRule): void {
    this.rulesAction.emit({action: NewLoyaltyActions.duplicateRule, data: {ruleSet: this.ruleSet, rule}});
  }

  public deleteItem(rule: ILoyaltyRule): void {
    this.rulesAction.emit({action: NewLoyaltyActions.deleteRule, data: {ruleSet: this.ruleSet, rule}});
  }

  public dropTable(event: CdkDragDrop<ILoyaltyRule>): void {
    const prevIndex = this.rules.findIndex((d) => d === event.item.data);
    this.rulesAction.emit({
      action: NewLoyaltyActions.dropRule,
      data: {ruleSet: this.ruleSet, prevIndex, currentIndex: event.currentIndex}
    });
  }
}
