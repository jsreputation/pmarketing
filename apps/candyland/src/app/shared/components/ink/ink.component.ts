import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit, QueryList,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { InkHostDirective } from '@cl-shared/components/ink/directives/ink-host.directive';
import { InkListenerDirective } from '@cl-shared/components/ink/directives/ink-listener.directive';
import { InkBarDirective } from '@cl-shared/components/ink/directives/ink-bar.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-ink',
  templateUrl: './ink.component.html',
  styleUrls: ['./ink.component.scss']
})
export class InkComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  @Input() public triangle = false;
  @Input() public border = false;

  @ContentChild(InkHostDirective, {static: false}) public inkHost: InkHostDirective;
  @ContentChildren(InkListenerDirective, {descendants: true}) public inkListener: QueryList<InkListenerDirective>;
  @ViewChild(InkBarDirective, {static: false}) public inkBar: InkBarDirective;

  private destroy$ = new Subject();

  public ngAfterViewInit(): void {
    this.getHost();
  }

  public ngAfterContentInit(): void {
    this.runHandlerSecond();
  }

  // first strategy get data from nested component

  public getHost() {
    const host =  this.inkHost ? this.inkHost.getHost() : null;
    let inkListeners: QueryList<InkListenerDirective>;
    if (host) {
      inkListeners = host.getInkListeners();
      this.runHandlerFirst(inkListeners);
    }
  }

  private runHandlerFirst(inkListeners): void {
    inkListeners.changes
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.setInkBarToInkListener(inkListeners);
      });
    this.setInkBarToInkListener(inkListeners);
  }

  // second strategy get data from ContentView

  private runHandlerSecond(): void {
    if (this.inkListener.length) {
      this.inkListener.changes
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.setInkBarToInkListener(this.inkListener);
        });
      this.setInkBarToInkListener(this.inkListener);
    }
  }

  private setInkBarToInkListener(inkListeners): void {
    inkListeners.toArray().forEach(ink => ink.inkBar = this.inkBar);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
