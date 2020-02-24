import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonSelect } from '@cl-core/models/common-select.interface';

@Component({
  selector: 'cl-earned-reward-form-group',
  templateUrl: './earned-reward-form-group.component.html',
  styleUrls: ['./earned-reward-form-group.component.scss']
})
export class EarnedRewardFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Input() public checkIsStamp: boolean;
  @Input() public stampNumbers: CommonSelect[];
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  public sendTestSms(): void {
  }

  public deleteEarnedRewardGroup(): void {
    this.deleteGroup.emit(this.index);
  }
}
