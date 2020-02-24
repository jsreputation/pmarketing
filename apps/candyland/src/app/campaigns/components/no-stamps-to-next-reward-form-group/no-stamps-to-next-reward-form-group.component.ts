import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonSelect } from '@cl-core/models/common-select.interface';

@Component({
  selector: 'cl-no-stamps-to-next-reward-form-group',
  templateUrl: './no-stamps-to-next-reward-form-group.component.html',
  styleUrls: ['./no-stamps-to-next-reward-form-group.component.scss']
})
export class NoStampsToNextRewardFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Input() public stampSlotNumbers: CommonSelect[];
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  public sendTestSms(): void {
  }

  public deleteNoStampsRewardGroup(): void {
    this.deleteGroup.emit(this.index);
  }
}
