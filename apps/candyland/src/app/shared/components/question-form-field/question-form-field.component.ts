import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-question-form-field',
  templateUrl: './question-form-field.component.html',
  styleUrls: ['./question-form-field.component.scss']
})
export class QuestionFormFieldComponent implements OnInit {
  @Input() public control: any;
  @Input() public level: number;
  @Input() public currentIndex: number;

  test = [1, 2];
  constructor() { }

  public get currentLevel(): number {
    return this.level++;
  }

  ngOnInit() {
    console.log('control', this.control);
    console.log('level', this.level);
  }

  public choseTypeQuestion(selectedTypeQuestion: IEngagementType): void {
    console.log(selectedTypeQuestion);
  }

}
