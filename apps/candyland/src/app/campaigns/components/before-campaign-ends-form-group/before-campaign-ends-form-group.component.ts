import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PeriodType } from '@cl-core/models/period-type.enum';

@Component({
  selector: 'cl-before-campaign-ends-form-group',
  templateUrl: './before-campaign-ends-form-group.component.html',
  styleUrls: ['./before-campaign-ends-form-group.component.scss']
})
export class BeforeCampaignEndsFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  public periodType: typeof PeriodType = PeriodType;
  public sendTestSms(): void {
    console.log('sendTestSms');
  }

  public deleteCampaignEndsGroup(): void {
    this.deleteGroup.emit(this.index);
  }

}
