import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'cl-game-mobile-preview',
  templateUrl: './game-mobile-preview.component.html',
  styleUrls: ['./game-mobile-preview.component.scss']
})
export class GameMobilePreviewComponent implements AfterViewInit {
  @ViewChild(MatTabGroup, {static: false}) public matTabGroup: MatTabGroup;
  @Output() public currentIndexTab: EventEmitter<number> = new EventEmitter<number>();
  @Output() public animationDone: EventEmitter<void> = new EventEmitter<void>();

  public ngAfterViewInit(): void {
    this.emitCurrentIndexTab(0);
    if (this.matTabGroup) {
      this.matTabGroup.selectedIndexChange
        .subscribe((value) => this.emitCurrentIndexTab(value));
      this.matTabGroup.animationDone.subscribe((val => this.animationDone.emit(val)));
    }
  }

  private emitCurrentIndexTab(index: number): void {
    this.currentIndexTab.next(index);
  }
}
