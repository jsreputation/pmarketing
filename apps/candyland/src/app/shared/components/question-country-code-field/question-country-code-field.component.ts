import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { SurveyService } from '@cl-core/services';

@Component({
  selector: 'cl-question-country-code-field',
  templateUrl: './question-country-code-field.component.html',
  styleUrls: ['./question-country-code-field.component.scss']
})
export class QuestionCountryCodeFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  public countriesList$: Observable<any>;
  constructor(private surveyService: SurveyService) { }

  public ngOnInit(): void {
    this.getCountries();
  }

  private getCountries(): void {
    this.countriesList$ = this.surveyService.getCountriesList();
  }

}
