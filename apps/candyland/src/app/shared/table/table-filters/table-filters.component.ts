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
  ViewContainerRef
} from '@angular/core';
import {TableFilterDirective} from './table-filter.directive';
import {FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, startWith, takeUntil} from 'rxjs/operators';
import {MatTableDataSource} from "@angular/material";

@Component({
  selector: 'cl-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableFiltersComponent implements AfterContentInit, OnDestroy {
  @Input() dataSource: MatTableDataSource<any>;
  @ContentChildren(TableFilterDirective) filters: QueryList<TableFilterDirective>;
  @ViewChild('filtersContainer', {read: ViewContainerRef, static: true}) filtersContainer: ViewContainerRef;
  private fg = new FormGroup({});
  private cache: { [name: string]: EmbeddedViewRef<any> } = {};
  private destroy$ = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }


  public ngAfterContentInit(): void {
    this.filtersContainer.clear();
    this.updateFilters();
    this.filters.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.updateFilters();
    });
    this.fg.valueChanges
      .pipe(
        startWith(this.fg.value),
        map( values => JSON.stringify(values)),
        distinctUntilChanged(),
        debounceTime(500),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        console.log('value', value);
        this.dataSource.filter = value;
        // console.log(value);
        // let date = value['date'];
        // ({date, ...value} = {...value, ...date}); //tslint:disable-line
        // this.dataSource.setFilters(value);
        // if(value.name) {
        //   this.dataSource.filter = value.name.toLocaleLowerCase();
        // }

        // this.dataSource.filterPredicate =
        //   (item: any, filter: string) => {
        //     Object.keys(value).forEach(key => {
        //       if(value[key] && !item[key].includes(value[key]))
        //       return false
        //     });
        //     return true;
        //   };
      });
  }

  private updateFilters() {
    Object.values(this.cache).forEach(item => {
      item.detach();
    });
    this.filters.forEach(item => {
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

  private addControl(name: string, defaultValue = null) {
    if (!this.fg.contains(name)) {
      this.fg.addControl(name, new FormControl(defaultValue));
    }
    return this.fg.get(name);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    Object.values(this.cache).forEach(item => {
      item.destroy();
    });
  }

}
