import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ICountryCode } from '../../../utils/general-static-data/country-code';
import { GeneralStaticDataService } from '../../../utils/general-static-data/general-static-data.service';
import { IAnswer, SurveyQuestionType } from '../../models/survey.model';

export interface IPhonePayload {
  type: SurveyQuestionType.phone;
  'default_country_code': string;
}

@Component({
  selector: 'perx-core-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnChanges, OnInit {
  @Input()
  public payload: IPhonePayload;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public countriesList$: Observable<ICountryCode[]>;
  public answer: number;
  public countryCode: string;
  private subject: Subject<number> = new Subject();

  constructor(private generalStaticDataService: GeneralStaticDataService) { }

  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList([
      'Hong Kong',
      'Indonesia',
      'Singapore',
      'Malaysia',
      'Philippines',
      'Vietnam'
    ]);
    this.subject.pipe(
      debounceTime(500)
    ).subscribe(inputValue => {
      this.updateAnswers.emit({ content: `${this.countryCode}${inputValue}` });
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
    if (changes.payload && this.payload.default_country_code) {
      this.countryCode = this.payload.default_country_code;
    }
  }

  public updateInput(value: number): void {
    this.answer = value;
    this.subject.next(value);
  }

  public updateCoutryCode(value: string): void {
    this.countryCode = value;
  }
}
