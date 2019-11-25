import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-rating-field',
  templateUrl: './question-rating-field.component.html',
  styleUrls: ['./question-rating-field.component.scss']
})
export class QuestionRatingFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  public scales: OptionConfig[] = [];

  public maxLabelLength: number = 25;

  public get left(): AbstractControl {
    return this.group.get('left_label');
  }

  public get right(): AbstractControl {
    return this.group.get('right_label');
  }

  public get color(): AbstractControl {
    return this.group.get('color');
  }

  public ngOnInit(): void {
    this.scales = this.getScales();
  }

  private getScales(): OptionConfig[] {
    const scales = [];
    for (let i = 3; i <= 10; i++) {
      scales.push(
        {
          title: i,
          value: i
        }
      );
    }
    return scales;
  }

}
