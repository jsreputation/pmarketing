import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IAnswer } from '../../models/survey.model';
import { Observable } from 'rxjs';
import { GeneralStaticDataService } from '../../../utils/general-static-data/general-static-data.service';

interface IPayloadPhone {
  type: string;
  'default_country_code': string;
}

@Component({
  selector: 'perx-core-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnChanges, OnInit {
  @Input()
  public payload: IPayloadPhone;

  @Input()
  public flush: boolean;

  @Output()
  public updateAnswers: EventEmitter<IAnswer> = new EventEmitter<IAnswer>();

  public countriesList$: Observable<any[]>;
  public answer: number;
  public countryCode: string;

  constructor(private generalStaticDataService: GeneralStaticDataService) { }
  public ngOnInit(): void {
    this.countriesList$ = this.generalStaticDataService.getCountriesList();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: number): void {
    this.answer = value;
    this.updateAnswers.emit({ content: this.countryCode + ' ' + value });
  }

  public updateCoutryCode(value: string): void {
    this.countryCode = value;
  }
}
