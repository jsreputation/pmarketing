import { animate, AnimationEvent, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { oc } from 'ts-optchain';
import { QuizQuestionType } from '../../models/quiz.model';

export interface ISwipePayload {
  type: QuizQuestionType.swipeDelete | QuizQuestionType.swipeSelect;
  choices: IChoice[]; // follow the format passed down actually
}

// For SlideList Component
export interface SwipeConfiguration {
  slideThreshold?: number;
  listType?: SwipeListType;
  classname?: string;
  disableWarnings?: boolean;
  numberOfIcons?: number;
}

export enum SwipeListType {
  SINGLELINE = 'singleline',
  MULTILINE = 'multiline',
  LISTWITHICON = 'listwithicon',
  LISTWITHIMAGE = 'listwithimage',
}

interface IChoice {
  id: string;
  title: string;
  img?: string;
  description?: string;
  icon?: string;
}

const enum SwipeMode {
  delete,
  select
}

const enum Warnings {
  CONFIG_NOT_LOADED = 'CONFIG_NOT_LOADED',
  ADDING_DEFAULT_SLIDE_THRESHOLD = 'ADDING_DEFAULT_SLIDE_THRESHOLD',
  ZERO_SLIDE_THRESHOLD_NOT_ALLOWED = 'ZERO_SLIDE_THRESHOLD_NOT_ALLOWED',
  SLIDE_THRESHOLD_NOT_FOUND = 'SLIDE_THRESHOLD_NOT_FOUND',
  MAX_SLIDE_THRESHOLD_NOT_ALLOWED = 'MAX_SLIDE_THRESHOLD_NOT_ALLOWED',
  INVALID_SLIDE_THRESHOLD_NOT_ALLOWED = 'INVALID_SLIDE_THRESHOLD_NOT_ALLOWED'
}

const Constants = {
  CONFIG_NOT_LOADED: 'You have not provided the configuration values, default will be loaded.',
  ADDING_DEFAULT_SLIDE_THRESHOLD: 'Will keep it default i.e.',
  SLIDE_THRESHOLD_NOT_FOUND: 'You have not provided the slideThreshold.',
  ZERO_SLIDE_THRESHOLD_NOT_ALLOWED: 'slideThreshold value can not be 0 or less than 0.',
  MAX_SLIDE_THRESHOLD_NOT_ALLOWED: 'slideThreshold value should be less than 50.',
  INVALID_SLIDE_THRESHOLD_NOT_ALLOWED: 'slideThreshold value is invalid, Expecting number between 0 to 50.',
  MAX_SLIDE_THRESHOLD: 50,
  MIN_SLIDE_THRESHOLD: 0,
  DEFAULT_SLIDE_THRESHOLD: 50,
  NUMBER_OF_ICONS: 2,
  DEFAULT_CLASS_NAME: 'ngstd-main-canvas'
};

@Component({
  selector: 'perx-core-swipe-list',
  templateUrl: './swipe-list.component.html',
  styleUrls: ['./swipe-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0s', style({ opacity: '0' })),
            animate('0.2s', style({ height: '0px', opacity: '0', display: 'none' }))
          ])
        ], { optional: true })
      ])
    ]), // snap animation ->
    trigger('slideLeft', [
      transition('* => *', animate(100, keyframes([ // update faster so more responsive snap if dont hit threshold
        style({ left: '*', offset: 0 }),
        style({ left: '0', offset: 1 }), // offset 1 : the snap occurs on timing 100 -> https://angular.io/guide/transition-and-triggers
      ])
      ))
    ])
  ]
})
export class QuizSwipeListComponent implements OnInit {
  @Input()
  public payload: ISwipePayload | undefined;
  @Input()
  public configuration: SwipeConfiguration = {};
  @Output()
  public updateAnswers: EventEmitter<string[]> = new EventEmitter<string[]>();

  // properties used in template
  public ngstdIndexNumber?: number; // undefined so visual snapping at first dont occur
  public listType: SwipeListType;
  public numberOfIcons: number;
  public lt: typeof SwipeListType = SwipeListType;
  public get choices(): IChoice[] {
    return oc(this).payload.choices([]);
  }

  private answerArr: { title: string; id: string }[] = [];
  private disableWarnings: boolean = false;
  private slideThreshold: number;
  private isValidConfig: boolean = false;
  private elementLeftSign: boolean = true;

  public ngOnInit(): void {
    this.initializeSwipeList();
    if (this.swipeMode === SwipeMode.delete) {
      this.answerArr = [...this.choices];
    }
  }

  private initializeSwipeList(): void {
    this.detectInvalidConfig();
    this.setDisableWarnings();
    this.setslideThreshold();
    this.setNumberOfIcons();
    this.setlistType();
  }

  private detectInvalidConfig(): void {
    if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
      this.isValidConfig = false;
      this.logWarnings(Warnings.CONFIG_NOT_LOADED);
    } else {
      this.isValidConfig = true;
    }
  }

  private setNumberOfIcons(): void {
    const config = this.configuration;
    if (!this.isValidConfig || config.numberOfIcons === 2) {
      this.numberOfIcons = Constants.NUMBER_OF_ICONS;
    } else {
      this.numberOfIcons = 0;
    }
  }

  private setslideThreshold(): void {
    if (!this.isValidConfig) {
      this.slideThreshold = Constants.DEFAULT_SLIDE_THRESHOLD;
      this.logWarnings(Warnings.SLIDE_THRESHOLD_NOT_FOUND, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      return;
    }
    const config = this.configuration;
    if (config.slideThreshold === null || config.slideThreshold === undefined || typeof config.slideThreshold !== 'number') {
      if (typeof config.slideThreshold !== 'number') {
        this.logWarnings(Warnings.INVALID_SLIDE_THRESHOLD_NOT_ALLOWED, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      } else {
        this.logWarnings(Warnings.SLIDE_THRESHOLD_NOT_FOUND, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      }
      this.slideThreshold = Constants.DEFAULT_SLIDE_THRESHOLD;
    } else if (config.slideThreshold < Constants.MIN_SLIDE_THRESHOLD
      || config.slideThreshold === Constants.MIN_SLIDE_THRESHOLD
      || config.slideThreshold > Constants.MAX_SLIDE_THRESHOLD) {
      if (config.slideThreshold > Constants.MAX_SLIDE_THRESHOLD) {
        this.logWarnings(Warnings.MAX_SLIDE_THRESHOLD_NOT_ALLOWED, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      }
      if (config.slideThreshold < Constants.MIN_SLIDE_THRESHOLD || config.slideThreshold === Constants.MIN_SLIDE_THRESHOLD) {
        this.logWarnings(Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED, `${Constants.ADDING_DEFAULT_SLIDE_THRESHOLD} ${Constants.DEFAULT_SLIDE_THRESHOLD}%.`);
      }
      this.slideThreshold = Constants.DEFAULT_SLIDE_THRESHOLD;
    } else {
      this.slideThreshold = config.slideThreshold;
    }
  }

  private setlistType(): void {
    const config = this.configuration;
    if (!this.isValidConfig || config.listType === undefined || config.listType === null) {
      this.listType = SwipeListType.SINGLELINE;
    } else {
      const listType = config.listType;
      switch (listType) {
        case SwipeListType.SINGLELINE:
        case SwipeListType.MULTILINE:
        case SwipeListType.LISTWITHICON:
        case SwipeListType.LISTWITHIMAGE:
          this.listType = listType;
          break;
        default:
          this.listType = SwipeListType.SINGLELINE;
      }
    }
  }

  private setDisableWarnings(): void {
    if (!this.isValidConfig) {
      this.disableWarnings = false;
    } else {
      const config = this.configuration;
      this.disableWarnings = !!config.disableWarnings;
    }
  }

  public getClassName(): string {
    if (!this.isValidConfig) {
      return `${Constants.DEFAULT_CLASS_NAME}`;
    }
    if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
      return `${Constants.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
    }
    return `${Constants.DEFAULT_CLASS_NAME}`;
  }

  public panend(_: WheelEvent, index: number, elementReference: HTMLDivElement): void {
    const currentMargin = this.getLeftPosition(elementReference);
    if (currentMargin > this.slideThreshold ||
      (currentMargin < -this.slideThreshold && this.numberOfIcons === Constants.NUMBER_OF_ICONS)) {
      this.swipeElement(index);
    } else {
      this.ngstdIndexNumber = undefined; // make undefined so it snaps back when mouse release
    }
  }

  public panmove(action: WheelEvent, index: number, elementReference: HTMLDivElement): void {
    this.ngstdIndexNumber = index; // trigger snap animation from moving instd of ending so doesnt get stuck // does this work?
    // no need to eliminate anymore if left only one element, remaining ans is chosen
    if (this.answerArr.length !== 1) {
      elementReference.style.left = `${action.deltaX}px`;
      elementReference.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
      // over threshold i want to snap to the end
      const currentMargin = this.getLeftPosition(elementReference);
      // snapping action when cross threshold
      if (currentMargin > this.slideThreshold ||
        (currentMargin < -this.slideThreshold && this.numberOfIcons === Constants.NUMBER_OF_ICONS)) {
        elementReference.style.display = 'none';
      }
    }
  }

  public alignComplete(event: AnimationEvent): void {
    event.element.style.left = '0px';
    event.element.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
  }

  public showLeftSign(i: number): boolean {
    return this.elementLeftSign && this.ngstdIndexNumber === i;
  }

  private swipeElement(index: number): void {
    if (this.swipeMode === SwipeMode.delete) {
      // cant splice cause index will change because of mutating, but index will always be the same from payload
      this.answerArr = this.answerArr.filter((answer) => answer.title !== this.choices[index].title);
      // emit back up our standing answers when there is only one answer left
      if (this.answerArr.length === 1) { // we need to assume payload is > 1
        this.updateAnswers.emit(this.answerArr.map(answer => answer.id));
      }
    } else {
      this.answerArr.push(this.choices[index]);
      this.updateAnswers.emit(this.answerArr.map(answer => answer.id));
    }
  }

  private getLeftPosition(elementReference: HTMLDivElement): number {
    let currentleftPosition: string | null = null;
    if (elementReference && elementReference.style && elementReference.style.left) {
      currentleftPosition = elementReference.style.left.slice(0, -2);
    }
    if (currentleftPosition !== null) {
      return (parseInt(currentleftPosition, 10) * 100) / window.innerWidth;
    }
    return 0;
  }

  private logWarnings(warningFor: string, extraMessage: any = null): void {
    if (this.disableWarnings) {
      return;
    }
    switch (warningFor) {
      case Warnings.CONFIG_NOT_LOADED:
      case Warnings.SLIDE_THRESHOLD_NOT_FOUND:
      case Warnings.ZERO_SLIDE_THRESHOLD_NOT_ALLOWED:
      case Warnings.MAX_SLIDE_THRESHOLD_NOT_ALLOWED:
      case Warnings.INVALID_SLIDE_THRESHOLD_NOT_ALLOWED:
        extraMessage === null ? console.warn(this.getConstValue(warningFor)) : console.warn(this.getConstValue(warningFor), extraMessage);
        break;
      default:
      // unicons !
    }
  }

  private getConstValue(constantName: string): string {
    return Constants[constantName];
  }

  private get swipeMode(): SwipeMode {
    return oc(this).payload.type() === QuizQuestionType.swipeDelete ? SwipeMode.delete : SwipeMode.select;
  }

  public get icon(): string {
    return oc(this).payload.type() === QuizQuestionType.swipeDelete ? 'delete_sweep' : 'thumb_up';
  }
}
