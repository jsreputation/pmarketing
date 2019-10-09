import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';
import { ScratchCard, SCRATCH_TYPE } from 'scratchcard-js';

@Component({
  selector: 'perx-core-scratch-card',
  templateUrl: './scratch-card.component.html',
  styleUrls: ['./scratch-card.component.scss']
})
export class ScratchCardComponent implements AfterViewInit {
  @Input()
  public coverImg: string;

  @Input()
  public underlyingImg: string;

  @Input()
  public uncoverPortionToTrigger?: number = 90;

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('scContainer', {static: false}) private scContainer: ElementRef;

  public ngAfterViewInit(): void {
      this.createScratchCard();
  }

  private createScratchCard(): void {
    const sc = new ScratchCard('#sc', {
      scratchType: SCRATCH_TYPE.CIRCLE,
      containerWidth: this.scContainer.nativeElement.offsetWidth,
      containerHeight: 300,
      imageForwardSrc: this.coverImg,
      imageBackgroundSrc: this.underlyingImg,
      clearZoneRadius: 20,
      percentToFinish: this.uncoverPortionToTrigger,
      nPoints: 30,
      pointSize: 4,
      callback: () => {
        this.completed.emit();
      }
    });
    sc.init()
      .then(() => {})
      .catch((error) => {
        // image not loaded
        alert(error.message);
      });
  }
}
