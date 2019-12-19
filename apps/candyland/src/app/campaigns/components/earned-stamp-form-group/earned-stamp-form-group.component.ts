import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-earned-stamp-form-group',
  templateUrl: './earned-stamp-form-group.component.html',
  styleUrls: ['./earned-stamp-form-group.component.scss']
})
export class EarnedStampFormGroupComponent {
  @Input() public group: FormGroup;
  @Input() public shortCodes: any[];
  @Input() public index: number;
  @Input() public stampNumbers: CommonSelect[];
  @Output() public deleteGroup: EventEmitter<number> = new EventEmitter<number>();
  public sendTestSms(): void {
  }

  public deleteEarnedStampGroup(): void {
    this.deleteGroup.emit(this.index);
  }
}
