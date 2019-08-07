import { Component, EventEmitter, Input, OnDestroy, OnInit, Output
} from '@angular/core';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SurveyQuestionType } from '../../../engagements/new-survey/containers/new-survey/new-survey.component';

@Component({
  selector: 'cl-question-form-field',
  templateUrl: './question-form-field.component.html',
  styleUrls: ['./question-form-field.component.scss'],
})
export class QuestionFormFieldComponent implements OnInit, OnDestroy {
  @Input() public group: FormGroup;
  @Input() public formGroup: FormGroup;
  @Input() public level: number;
  @Input() public currentIndex: number;
  @Output() public removed = new EventEmitter<number>();
  @Output() public changeControl = new EventEmitter<any>();
  public descriptionField: FormControl;
  public showDescription: boolean;
  public required = false;
  public closed = true;
  public surveyQuestionType = SurveyQuestionType;
  private destroy$ = new Subject();

  constructor(private questionFormFieldService: QuestionFormFieldService,
              private fb: FormBuilder,
              ) {
  }

  public isActive(): boolean {
    return !this.questionFormFieldService.getFocusedElem(this.currentIndex, this.level);
  }

  public ngOnInit(): void {
    this.updateStatusDescriptionField();
    this.createDescriptionControl(this.description.value);
    this.subscribeDescriptionControl();
  }

  public getTypeField(): AbstractControl {
    return this.group.get('selectedType');
  }

  public get name(): AbstractControl {
    return this.group.get('name');
  }

  public get description(): AbstractControl {
    return this.group.get('description');
  }

  public remove(): void {
    this.removed.emit(this.currentIndex);
  }

  public choseTypeQuestion(selectedTypeQuestion: string): void {
    this.changeControl.emit({index: this.currentIndex, selectedTypeQuestion});
  }

  private updateStatusDescriptionField(): void {
    if (this.description.value) {
      this.description.enable();
    }
  }

  private createDescriptionControl(val: boolean): void {
    this.descriptionField = this.fb.control(val);
  }

  private subscribeDescriptionControl(): void {
    this.descriptionField
      .valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.showDescription = value;
        this.toggleControl( value);
      });
  }

  private toggleControl(toggle: boolean): void {
    toggle
      ? this.description.enable({emitEvent: false})
      : this.description.disable({emitEvent: false});
    this.group.updateValueAndValidity();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
