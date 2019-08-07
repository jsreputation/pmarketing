import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { TableFilterDirective } from './table-filter.directive';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableFiltersComponent implements AfterContentInit, OnDestroy {
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public classList: string = '';
  @ContentChildren(TableFilterDirective) public filters: QueryList<TableFilterDirective>;
  @ViewChild('filtersContainer', { read: ViewContainerRef, static: true }) public filtersContainer: ViewContainerRef;
  private fg: FormGroup = new FormGroup({});
  private cache: { [name: string]: EmbeddedViewRef<any> } = {};
  private destroy$: Subject<void> = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  public ngAfterContentInit(): void {
    this.filtersContainer.clear();
    this.updateFilters();
    this.filters.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateFilters();
      });
    this.fg.valueChanges
      .pipe(
        startWith(this.fg.value),
        map((values: any) => JSON.stringify(values)),
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe((value: any) => {
        this.dataSource.filter = value;
      });
  }

  private updateFilters(): void {
    Object.values(this.cache).forEach((item: any) => {
      item.detach();
    });
    this.filters.forEach((item: any) => {
      if (!this.cache[item.name] || this.cache[item.name].destroyed) {
        if (item.value && item.value.value) {
          item.value = item.value.value;
        }
        const control = this.addControl(item.name, item.value);
        this.cache[item.name] = item.template.createEmbeddedView({
          $implicit: control
        });
      }
      this.filtersContainer.insert(this.cache[item.name]);
      this.changeDetectorRef.detectChanges();
    });
  }

  private addControl(name: string, defaultValue: any = null): AbstractControl | null {
    if (!this.fg.contains(name)) {
      this.fg.addControl(name, new FormControl(defaultValue));
    }
    return this.fg.get(name);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    Object.values(this.cache).forEach((item: any) => {
      item.destroy();
    });
  }

}
