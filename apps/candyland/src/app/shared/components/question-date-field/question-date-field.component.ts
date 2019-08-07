import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'cl-question-date-field',
  templateUrl: './question-date-field.component.html',
  styleUrls: ['./question-date-field.component.scss']
})
export class QuestionDateFieldComponent implements OnDestroy {
  @Input() public group: FormGroup;
  private destroy$ = new Subject();

  public get endDate() {
    return this.group.get('endDate');
  }

  public get startDate() {
    return this.group.get('startDate');
  }

  public toggleEndDate(value: boolean) {
    if (!value) {
      this.endDate.reset();
      this.endDate.disable();
    } else {
      this.endDate.enable();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
