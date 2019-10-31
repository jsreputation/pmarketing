import {
  Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges
} from '@angular/core';
import { QuestionFormFieldService } from '@cl-shared/questions/question-form-field/shared/services/question-form-field.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { WSurveyQuestionType } from '@perx/whistler';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-question-form-field',
  templateUrl: './question-form-field.component.html',
  styleUrls: ['./question-form-field.component.scss'],
})
export class QuestionFormFieldComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public group: FormGroup;
  @Input() public formGroup: FormGroup;
  @Input() public level: number;
  @Input() public currentIndex: number;
  @Output() public removed: EventEmitter<number> = new EventEmitter<number>();
  @Output() public changeControl: EventEmitter<any> = new EventEmitter<any>();
  public descriptionField: FormControl;
  public descriptionFieldMaxLength: number = 1024;
  public showDescription: boolean;
  public required: boolean = false;
  public closed: boolean = true;
  public surveyQuestionType: any = WSurveyQuestionType;
  private destroy$: Subject<any> = new Subject();

  constructor(
    private questionFormFieldService: QuestionFormFieldService,
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentIndex.currentValue !== changes.currentIndex.previousValue) {
      const updatedFormId = changes.currentIndex.currentValue.toString().replace('-', '.');
      this.id.patchValue(updatedFormId);
    }
  }

  public getTypeField(): AbstractControl {
    return this.group.get('selectedType');
  }

  public get question(): AbstractControl {
    return this.group.get('question');
  }

  public get description(): AbstractControl {
    return this.group.get('description');
  }

  public get id(): AbstractControl {
    return this.group.get('id');
  }

  public remove(): void {
    this.removed.emit(this.currentIndex);
  }

  public choseTypeQuestion(selectedTypeQuestion: WSurveyQuestionType): void {
    this.changeControl.emit({ index: this.currentIndex, selectedTypeQuestion, level: this.level });
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
        this.toggleControl(value);
      });
  }

  private toggleControl(toggle: boolean): void {
    toggle
      ? this.description.enable({ emitEvent: false })
      : this.description.disable({ emitEvent: false });
    this.group.updateValueAndValidity();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
