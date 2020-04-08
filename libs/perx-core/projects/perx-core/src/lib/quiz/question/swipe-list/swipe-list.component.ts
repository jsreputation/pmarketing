import { animate, AnimationEvent, keyframes, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { oc } from 'ts-optchain';
import { Constants, QuizQuestionType, SwipeConfiguration, SwipeListType, Warnings } from '../../models/quiz.model';

interface IPayloadSwipe {
  type: string;
  choices: (IChoice | string)[]; // follow the format passed down actually
}

interface IChoice {
  title: string;
  img?: string;
  description?: string;
  icon?: string;
}

const enum SwipeMode {
  delete,
  select
}

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
  public payload: IPayloadSwipe;
  @Input()
  public configuration: SwipeConfiguration;
  @Output()
  public updateAnswers: EventEmitter<string[]> = new EventEmitter<string[]>();

  public ngstdIndexNumber?: number; // undefined so visual snapping at first dont occur
  public listType: SwipeListType;
  public numberOfIcons: number;
  public choices: IChoice[];
  public lt: typeof SwipeListType = SwipeListType;

  private answerArr: { title: string }[] = [];
  private disableWarnings: boolean = false;
  private slideThreshold: number;
  private isValidConfig: boolean = false;
  private elementLeftSign: boolean = true;

  public ngOnInit(): void {
    this.choices = oc(this).payload.choices([]).map(choice =>
      (typeof choice === 'string') ? { title: choice } : choice
    );
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
        this.updateAnswers.emit(this.answerArr.map(answer => answer.title));
      }
    } else {
      this.answerArr.push(this.choices[index]);
      this.updateAnswers.emit(this.answerArr.map(answer => answer.title));
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
