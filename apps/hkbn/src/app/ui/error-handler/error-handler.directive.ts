import {
  AfterViewInit,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { MatFormField } from '@angular/material';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[hkbnErrorHandler]'
})
export class ErrorHandlerDirective implements AfterViewInit, OnDestroy {
  private errorName: string | string[];
  private errorEmbeddedRef: EmbeddedViewRef<any>;
  private control: NgControl;

  private destroy$: Subject<void> = new Subject<void>();

  @Input()
  public set hkbnErrorHandler(errorName: string | string[]) {
    this.errorName = errorName;
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private formField: MatFormField
  ) { }

  public ngAfterViewInit(): void {
    this.control = this.formField._control.ngControl;
    this.errorEmbeddedRef = this.viewContainer.createEmbeddedView(this.templateRef, null, 0);
    this.viewContainer.detach(0);

    this.formField._control.stateChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {

      const hasError = typeof this.errorName === 'string'
        ? this.control.hasError(this.errorName)
        : this.errorName.some((error) => this.control.hasError(error));

      if (hasError) {
        this.viewContainer.insert(this.errorEmbeddedRef);
      } else {
        this.viewContainer.detach(0);
      }
    });
  }

  public ngOnDestroy(): void {
    this.viewContainer.clear();
    this.errorEmbeddedRef.destroy();
    this.destroy$.next();
    this.destroy$.complete();
  }

}
