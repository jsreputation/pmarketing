import { MatSort } from '@angular/material';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ITableService } from '@cl-shared/table/data-source/table-service-interface';
import { SortModel } from '@cl-shared/table/data-source/sort.model';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IPagination } from './ipagination';

// tslint:disable
export class CustomDataSource<T> {
  private dataSubject = new BehaviorSubject<T[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  // used for toggle spiner loading
  public loading$ = this.loadingSubject.asObservable();
  private changeFilterSearch = new BehaviorSubject<number>(0);
  // used for setUp pagination index page to 0 when searching
  public changeSearch$ = this.changeFilterSearch.asObservable();
  private lengthData = new BehaviorSubject<number>(0);
  // used for set all length items the pagination component
  public length$ = this.lengthData.asObservable();
  // use for set included params
  private _params: HttpParamsOptions;
  private destroy$: Subject<void> = new Subject();

  public hasData = true;

  public set params(value: HttpParamsOptions) {
    this._params = value;
    this.loadingData();
  }

  public get params() {
    return this._params || {};
  }

  public get data() {
    return this.dataSubject.value;
  }

  public get data$() {
    return this.dataSubject.asObservable();
  }

  // default items on the page set up pageSize
  constructor(public dataService: ITableService, public pageSize: number = 5) {
    this.loadingData();
  }

  private _sort: any;

  public get sort(): SortModel {
    return this._sort;
  }

  public set sort(val: SortModel) {
    this._sort = val;
    this.changeFilterSearch.next(0);
    this.loadingData();
  }

  private _filter: any;

  public get filter(): { [key: string]: string } {
    return this._filter;
  }

  public set filter(value: { [key: string]: string }) {
    const filter = JSON.parse((value as any));
    this._filter = filter;
    this.changeFilterSearch.next(0);

    this.loadingData();
  }

  public set pagination(value: IPagination) {
    if (this.pageSize !== value.pageSize) {
      this.pageSize = value.pageSize;
      this.changeFilterSearch.next(0);
    }
    this.loadingData(value);
  }

  public connect(): Observable<any> {
    return this.dataSubject.asObservable();
  }

  public disconnect(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
    this.dataSubject.complete();
    this.changeFilterSearch.complete();
    this.loadingSubject.complete();
    this.lengthData.complete();
  }


  public updateData(): void {
    this.loadingData({ pageIndex: 0, pageSize: this.pageSize });
  }

  public registerSort(sort: MatSort) {
    if (!sort) {
      throw new Error('Sort is undefined');
    }
    sort.sortChange
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe(newSort => this.sort = newSort);
  }

  private loadingData(pagination?: IPagination) {
    const params: HttpParamsOptions = {
      ...this.params,
      ...this.prepareFilters(),
      ...this.sortPrepare(this.sort),
      'page[number]': pagination ? pagination.pageIndex + 1 : 1,
      'page[size]': pagination ? pagination.pageSize : this.pageSize
    };
    this.loadingSubject.next(true);
    this.dataService.getTableData(params)
      .subscribe((res: ITableData<T>) => {
        this.dataSubject.next(res.data);
        this.lengthData.next(res.meta.record_count);
        this.loadingSubject.next(false);
      }, () => {
        this.dataSubject.next([]);
        this.lengthData.next(0);
        this.loadingSubject.next(false);
      });
  }

  private sortPrepare(sortData: SortModel) {
    if (sortData && sortData.direction !== '') {
      const sort = sortData.direction === 'asc'
        ? `${sortData.active}`
        : `-${sortData.active}`;
      return {
        sort
      };
    }
    return {};
  }

  private prepareFilters(): any {
    if (!this._filter) {
      return {};
    }
    const result = {};
    Object.keys(this._filter)
      .forEach((item) => {
        if (this.filter[item]) {
          result[`filter[${item}]`] = this.filter[item];
        }
      });
    return result;
  }

}
