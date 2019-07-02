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
export class InkComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() public triangle = false;
  @Input() public border = false;

  @ContentChild(InkHostDirective, {static: false}) public _inkHost: InkHostDirective;
  @ContentChildren(InkListenerDirective, {descendants: true}) public _inkListener: QueryList<InkListenerDirective>;
  @ViewChild(InkBarDirective, {static: false}) public _inkBar: InkBarDirective;

  private destroy$ = new Subject();
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.getHost();
  }

  ngAfterContentInit(): void {
    this.runHandlerSecond();
  }

  // first strategy get data from nested component

  getHost() {
    const host =  this._inkHost ? this._inkHost.getHost() : null;
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
      .subscribe((res) => {
        this.setInkBarToInkListener(inkListeners);
      });
    this.setInkBarToInkListener(inkListeners);
  }

  // second strategy get data from ContentView

  private runHandlerSecond(): void {
    if (this._inkListener.length) {
      this._inkListener.changes
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((res) => {
          this.setInkBarToInkListener(this._inkListener);
        });
      this.setInkBarToInkListener(this._inkListener);
    }
  }

  private setInkBarToInkListener(inkListeners): void {
    inkListeners.toArray().forEach(ink => ink.inkBar = this._inkBar);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
