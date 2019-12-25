import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { PeriodType } from '@cl-core/models/period-type.enum';

@Component({
  selector: 'cl-campaign-not-completed-form-group',
  templateUrl: './campaign-not-completed-form-group.component.html',
  styleUrls: ['./campaign-not-completed-form-group.component.scss']
})
export class CampaignNotCompletedFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  @Output() public sendSms: EventEmitter<any> = new EventEmitter();
  public periodType: typeof PeriodType = PeriodType;
  public sendTestSms(): void {
    this.sendSms.emit({group: this.group, index: this.index});
  }

  public get numberPeriod(): AbstractControl {
    return this.group.get('numberPeriod');
  }

  public get type(): AbstractControl {
    return this.group.get('type');
  }

  public get time(): AbstractControl {
    return this.group.get('time');
  }

  public deleteCompletedGroup(): void {
    this.deleteGroup.emit(this.index);
  }
}
