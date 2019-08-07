import { Component } from '@angular/core';

@Component({
  selector: 'cl-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  public mockData: any[] = [
    { value: 'test-0', viewValue: 'test 0' },
    { value: 'test-1', viewValue: 'test 1' },
    { value: 'test-2', viewValue: 'test 2' }
  ];
}
