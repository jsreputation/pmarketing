import { Component, OnInit, Input } from '@angular/core';
import { SurveyQuestionType } from '../../models/survey.model';

@Component({
  selector: 'perx-core-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})

interface IPayloadSelect {
  type: SurveyQuestionType;
  choices: string[];
}

export class SelectComponent implements OnInit {

  @Input()
  public payload: IPayloadSelect;

  public selectedChoice: number;

  constructor() { }

  public ngOnInit(): void {
  }

  public select(index: number): void {
    this.selectedChoice = index;
  }

  public isSelected(index: number): boolean {
    return this.selectedChoice === index;
  }
}
