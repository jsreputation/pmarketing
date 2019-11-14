import {
  ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SurveyService } from '@cl-core-services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WSurveyQuestionType } from '@perx/whistler';
// tslint:disable
export const EPANDED_TEXTAREA_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QuestionTypeComponent),
  multi: true
};

@Component({
  selector: 'cl-question-type',
  templateUrl: './question-type.component.html',
  styleUrls: ['./question-type.component.scss'],
  providers: [
    EPANDED_TEXTAREA_VALUE_ACCESSOR
  ]
})
export class QuestionTypeComponent implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() public addQuestionType = false;
  @Input() typeList: IEngagementQuestionType[];
  @Input() currentIndex: string;
  @Input() level: number;
  @Input() public set setTypeQuestion(typeQuestion: string) {
    this.type.patchValue(typeQuestion);
  }
  @Input() public onlyView: boolean = false;

  @Output() selectTypeQuestion = new EventEmitter<IEngagementQuestionType>();

  @ViewChild('matSelect', { static: true }) public matSelect: any;
  public type = new FormControl();

  private destroy$ = new Subject();

  public onChange: any = () => {
  };
  public onTouch: any = () => {
  };

  constructor(private surveyService: SurveyService,
    private cd: ChangeDetectorRef) {
  }

  public closed(): void {
    this.selectTypeQuestion.emit(this.type.value);
  }

  public openSelect(): void {
    if (!this.onlyView) {
      this.matSelect.open();
    }
  }

  public getIndex(): any {
    if (!this.currentIndex && +this.currentIndex !== 0) {
      return null;
    }
    return this.currentIndex
      .toString()
      .split('-')
      .map(item => +item + 1)
      .join('-');
  }

  public hideQuestionGroup(type: string): boolean {
    if (this.addQuestionType) {
      return !(this.level >= 0 && type === WSurveyQuestionType.questionGroup);
    }
    return !(this.level > 0 && type === WSurveyQuestionType.questionGroup);
  }

  ngOnInit() {
    this.getSurveyQuestionType();
    this.subscribeControlValueChanges();
  }

  private subscribeControlValueChanges(): void {
    this.type.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((val) => {
        this.onChange(val);
        this.onTouch(val);
      });
  }

  private getSurveyQuestionType(): void {
    this.surveyService.getSurveyQuestionType()
      .subscribe(res => {
        this.typeList = res;
        this.cd.markForCheck();
      });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.type.disable() : this.type.enable();
  }

  writeValue(obj: any): void {
    if (obj !== undefined) {
      this.type.patchValue(obj);
      this.onChange(obj);
      this.onTouch(obj);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
