import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { IAnswer } from '../../models/survey.model';
import { Observable, of } from 'rxjs';

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

  public ngOnInit(): void {
    this.countriesList$ = of([
      {
        id: 3,
        name: 'Azerbaijan',
        phone: '+994'
      },
      {
        id: 4,
        name: 'Bahrain',
        phone: '+973'
      }
    ]);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.flush && changes.flush.currentValue !== undefined) {
      this.updateInput(this.answer);
    }
  }

  public updateInput(value: number): void {
    this.answer = value;
    this.updateAnswers.emit({ content: value });
  }
}
