import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-rating-field',
  templateUrl: './question-rating-field.component.html',
  styleUrls: ['./question-rating-field.component.scss']
})
export class QuestionRatingFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  public scales: CommonSelect[] = [];
  constructor() { }

  public ngOnInit() {
    this.setScales();
  }

  public get left(): AbstractControl {
    return this.group.get('left');
  }

  public get right(): AbstractControl {
    return this.group.get('right');
  }

  private setScales(): void {
    for (let i = 3; i <= 10; i++) {
      this.scales.push(
        {
          value: `${i}`,
          viewValue: `Scale ${i}`
        }
      );
    }
  }

  public get color(): AbstractControl {
   return this.group.get('selectColor');
  }

}
