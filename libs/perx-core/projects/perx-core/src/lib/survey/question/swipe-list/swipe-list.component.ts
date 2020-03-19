import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, style, keyframes, transition, animate, query, stagger } from '@angular/animations';

import { Configuration } from './interfaces/configuration';
import { ListType } from './enums/list-type';
import { Warnings } from './enums/warnings';
import { Constants } from './constants/constants';

@Component({
  selector: 'perx-core-swipe-list',
  templateUrl: './swipe-list.component.html',
  styleUrls: ['./swipe-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0s', style({opacity: '0'})),
            animate('0.2s', style({height: '0px', opacity: '0', display: 'none'}))
          ])
        ], {optional: true})
      ])
    ]),
    trigger('slideLeft', [
      transition('* => *', animate(100, keyframes([
          style({left: '*', offset: 0}),
          style({left: '0', offset: 1}),
        ])
      ))
    ])
  ]
})
export class SwipeListComponent implements OnInit {

  @Input() items: any;
  @Input() configuration: Configuration;
  @Output() deletedItem = new EventEmitter<any>();
  public ngstdIndexNumber: number = 0;
  private disableWarnings = false;
  public listType: string = '';
  private slideThreshold: number;
  public numberOfDeleteIcon: number;
  private isValidConfig: boolean = false;
  private elementLeftSign = true;

  constructor() {
  }

  ngOnInit() {
    this.initializeSWipeList();
  }

  initializeSWipeList(): void {
    this.detectInvalidConfig();
    this.setDisableWarnings();
    this.setslideThreshold();
    this.setNumberOfDeleteIcon();
    this.setlistType();
  }

  detectInvalidConfig(): void {
    if (this.configuration === null || this.configuration === undefined || this.configuration === '') {
      this.isValidConfig = false;
      this.logWarnings(Warnings.CONFIG_NOT_LOADED);
    } else {
      this.isValidConfig = true;
    }
  }

  setNumberOfDeleteIcon(): void {
    const config = this.configuration;
    if (!this.isValidConfig || config.numberOfDeleteIcon === 2) {
      this.numberOfDeleteIcon = Constants.NUMBER_OF_DELETE_ICONS;
    } else {
      this.numberOfDeleteIcon = 0;
    }
  }

  setslideThreshold(): void {
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
    } else {
      if (config.slideThreshold < Constants.MIN_SLIDE_THRESHOLD || config.slideThreshold === Constants.MIN_SLIDE_THRESHOLD || config.slideThreshold > Constants.MAX_SLIDE_THRESHOLD) {
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
  }

  setlistType(): void {
    const config = this.configuration;
    if (!this.isValidConfig || config.listType === `` || config.listType === undefined || config.listType === null) {
      this.listType = ListType.SINGLELINE;
    } else {
      const listType = config.listType.trim();
      switch (listType) {
        case ListType.SINGLELINE:
        case ListType.MULTILINE:
        case ListType.LISTWITHICON:
        case ListType.LISTWITHIMAGE:
          this.listType = listType;
          break;
        default:
          this.listType = ListType.SINGLELINE;
      }
    }
  }

  setDisableWarnings(): void {
    if (!this.isValidConfig) {
      this.disableWarnings = false;
    } else {
      const config = this.configuration;
      this.disableWarnings = (config.disableWarnings && config.disableWarnings !== undefined && config.disableWarnings !== null) ? true : false;
    }
  }

  getClassName(): string {
    if (!this.isValidConfig) {
      return `${Constants.DEFAULT_CLASS_NAME}`;
    } else {
      if (this.configuration.classname !== '' && this.configuration.classname !== null && this.configuration.classname !== undefined) {
        return `${Constants.DEFAULT_CLASS_NAME} ${this.configuration.classname}`;
      } else {
        return `${Constants.DEFAULT_CLASS_NAME}`;
      }
    }
  }

  panend(_action, index, elementRefrence): void {
    const currentMargin = this.getLeftPosition(elementRefrence);
    if (currentMargin > this.slideThreshold ||
      (currentMargin < -this.slideThreshold && this.numberOfDeleteIcon === Constants.NUMBER_OF_DELETE_ICONS)) {
      this.removeElement(index);
    } else {
      this.ngstdIndexNumber = index;
    }
  }

  panmove(action, elementRefrence): void {
    elementRefrence.style.left = action.deltaX + 'px';
    elementRefrence.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
  }

  alignComplete(event): void {
    event.element.style.left = '0px';
    event.element.offsetLeft > 0 ? this.elementLeftSign = true : this.elementLeftSign = false;
    this.ngstdIndexNumber = 0;
  }

  getLeftSign() {
    return this.elementLeftSign ? true : false;
  }

  removeElement(index): void {
    const deletedItem = this.items[index];
    this.items.splice(index, 1);
    this.deletedItem.emit(deletedItem);
  }

  getLeftPosition(elementRefrence): number {
    const currentleftPosition = elementRefrence.style.left.slice(0, -2);
    if (currentleftPosition !== null) {
      return (parseInt(
        currentleftPosition, 10
      ) * 100) / window.innerWidth;
    } else {
      return 0;
    }
  }

  logWarnings(warningFor: string, extraMessage: any = null): void {
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

  getConstValue(constantName: string): string {
    return Constants[constantName];
  }
}
