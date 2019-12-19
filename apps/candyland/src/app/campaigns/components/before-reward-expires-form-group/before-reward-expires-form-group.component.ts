import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PeriodType } from '@cl-core/models/period-type.enum';

@Component({
  selector: 'cl-before-reward-expires-form-group',
  templateUrl: './before-reward-expires-form-group.component.html',
  styleUrls: ['./before-reward-expires-form-group.component.scss']
})
export class BeforeRewardExpiresFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  public periodType: typeof PeriodType = PeriodType;
  public sendTestSms(): void {
  }

  public deleteRewardExpiresGroup(): void {
    this.deleteGroup.emit(this.index);
  }
}
